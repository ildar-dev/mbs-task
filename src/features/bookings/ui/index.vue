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
import { getBookingsList } from '@/shared/api/bookings/getBookingList'
import { fromDto as mapBooking } from '@/entities/booking/mappers/fromDto'
import type { IBooking } from '@/entities/booking/models/booking'
import type { ISessionPage } from '@/features/session/models/sessionPage'
import { getGroupedBookings } from '@/features/bookings/business/getGroupedBookings'
import { getSessionPageById } from '@/features/session/business/getSessionPageById'
import { paymentBooking } from '@/features/bookings/business/payment'
import type { IPaymentDetails } from '@/features/bookings/models/payment'

const isLoading = ref(false)
const error = ref<unknown>(null)
const bookings = ref<IBooking[]>([])
const sessionsById = ref<Record<number, ISessionPage>>({})

const groups = ref(getGroupedBookings([]))

async function load() {
  try {
    isLoading.value = true
    error.value = null
    const dtoList = await getBookingsList()
    bookings.value = dtoList.map(mapBooking)
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

function onPay(bookingId: string) {
  paymentBooking(bookingId)
    .then((paymentDetails: IPaymentDetails) => {
      console.log(paymentDetails)
    })
    .catch((error: unknown) => {
      console.error(error)
    })
}
</script>

<style scoped>
</style>
