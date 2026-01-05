<template>
  <div class="flex flex-col gap-4">
    <h2 class="text-4xl mb-6 text-center">Мои билеты</h2>
    <div v-if="error" class="text-red-600">{{ error }}</div>
    <BookingsGroups
      v-else
      :groups="groups"
      :sessions-by-id="sessionsById"
      @pay="onPay"
      @expired="onExpired"
    />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import BookingsGroups from './BookingsGroups.vue'

import { getBookingList } from '../business/getBookingList'
import type { IBooking } from '@/entities/booking/models/booking'

import { getGroupedBookings } from '../business/getGroupedBookings'
import { usePaymentBooking } from '../composables/usePaymentBooking'
import { EPaymentStatus } from '../models/payment'

import { getSessionAggregateById } from '@/entities/session/repository/getSessionAggregate'
import type { ISessionAggregate } from '@/entities/session/models/sessionAggregate'

const isLoading = ref(false)
const error = ref<unknown>(null)
const bookings = ref<IBooking[]>([])
const sessionsById = ref<Record<number, ISessionAggregate>>({})

const groups = ref(getGroupedBookings([]))
const { pay } = usePaymentBooking()

async function load() {
  try {
    isLoading.value = true
    error.value = null
    try {
      bookings.value = await getBookingList()// Неоптимизировано, но явно то, как получаем данные для каждой сессии
      const uniqueSessionIds: number[] = Array.from(new Set<number>(bookings.value.map((b: IBooking) => b.sessionId)))
      const pages = await Promise.all(uniqueSessionIds.map((id: number) => getSessionAggregateById(id)))
      sessionsById.value = Object.fromEntries(pages.map(p => [p.session.id, p]))
      
      // Группируем с учётом времени сеансов
      groups.value = getGroupedBookings(bookings.value, sessionsById.value)
    } catch (e) {
      console.error(e)
      error.value =  e instanceof Error ? (e.message) : 'Не удалось загрузить билеты'
    }
  } catch (e) {
    error.value = e
  } finally {
    isLoading.value = false
  }
}

onMounted(load)

async function onPay(booking: IBooking) {
  try {
    const res = await pay(booking)
    if (res.status === EPaymentStatus.SUCCESS) {
      await load()
    }
  } catch (e) {
    console.error(e)
  }
}

async function onExpired() {
  await load()
}
</script>

<style scoped>
</style>
