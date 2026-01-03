<template>
  <div class="flex flex-col gap-2">
    <h3 class="text-lg font-semibold" v-if="title">{{ title }}</h3>
    <div v-if="items.length === 0" class="text-sm text-gray-500">Нет бронирований</div>
    <Booking
      v-for="it in items"
      :key="it.booking.id"
      :booking="it.booking"
      :session-page="it.sessionPage"
      @pay="$emit('pay', it.booking.id)"
    />
  </div>
</template>

<script setup lang="ts">
import Booking from './Booking.vue'
import type { IBooking } from '@/entities/booking/models/booking'
import type { ISessionPage } from '@/features/session/models/sessionPage'

const props = defineProps<{
  title?: string
  items: Array<{ booking: IBooking; sessionPage: ISessionPage }>
}>()

defineEmits<{
  (e: 'pay', bookingId: string): void
}>()
</script>

<style scoped>
</style>
