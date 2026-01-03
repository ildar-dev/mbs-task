<template>
  <div class="flex flex-col gap-4">
    <div v-if="isLoading" class="text-gray-500">Загрузка бронирований...</div>
    <div v-else-if="error" class="text-red-600">Ошибка загрузки</div>
    <BookingsGroups
      v-else
      :groups="groups"
      :sessions-by-id="sessionsById"
      @pay="onPay"
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

import { getSessionPageById } from '@/features/session/business/getSessionPageById'
import type { ISessionPage } from '@/features/session/models/sessionPage'

const isLoading = ref(false)
const error = ref<unknown>(null)
const bookings = ref<IBooking[]>([])
const sessionsById = ref<Record<number, ISessionPage>>({})

const groups = ref(getGroupedBookings([]))
const { pay } = usePaymentBooking()

async function load() {
  try {
    isLoading.value = true
    error.value = null
    bookings.value = await getBookingList()
    groups.value = getGroupedBookings(bookings.value)

    // Подтянем данные сессий разом
    const uniqueSessionIds: number[] = Array.from(new Set<number>(bookings.value.map((b: IBooking) => b.sessionId)))
    const pages = await Promise.all(uniqueSessionIds.map((id: number) => getSessionPageById(id)))
    sessionsById.value = Object.fromEntries(pages.map(p => [p.session.id, p]))
  } catch (e) {
    error.value = e
  } finally {
    isLoading.value = false
  }
}

onMounted(load)

async function onPay(bookingId: string) {
  try {
    const res = await pay(bookingId)
    if (res.status === EPaymentStatus.SUCCESS) {
      await load()
    }
  } catch (e) {
    console.error(e)
  }
}
</script>

<style scoped>
</style>
