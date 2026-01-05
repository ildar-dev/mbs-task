<template>
  <div class="flex flex-col gap-2 text-lg">
    <h3 class="text-lg border-b border-gray-200 pb-4 pl-1" v-if="title">{{ title }}</h3>
    <div v-if="items.length === 0" class="text-sm text-gray-500">Нет бронирований</div>
    <Booking
      v-for="it in items"
      :key="it.booking.id"
      :booking="it.booking"
      :session-page="it.sessionPage"
      @pay="$emit('pay', it.booking)"
      @expired="$emit('expired', it.booking.id)"
    />
  </div>
</template>

<script setup lang="ts">
import Booking from './Booking.vue'
import type { IBooking } from '@/entities/booking/models/booking'
import type { ISessionAggregate } from '@/entities/session/models/sessionAggregate'

const props = defineProps<{
  title?: string
  items: Array<{ booking: IBooking; sessionPage: ISessionAggregate }>
}>()

defineEmits<{
  (e: 'pay', booking: IBooking): void
  (e: 'expired', bookingId: string): void
}>()
</script>

<style scoped>
</style>
