<template>
  <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 items-center py-3 border-b border-gray-200">
    <!-- 1) Фильм, кинотеатр, дата, время -->
    <div class="flex flex-col">
      <div class="font-semibold">{{ sessionPage.movie.title }}</div>
      <div class="text-sm text-gray-600">{{ sessionPage.cinema.name }}</div>
      <div class="text-sm text-gray-600">
        {{ dateTimeText }}
      </div>
    </div>

    <!-- 2) Ряд и места -->
    <div class="text-sm text-gray-800">
      <template v-if="booking.seats.length === 1">
        Ряд {{ booking.seats[0].rowNumber }}, место {{ booking.seats[0].seatNumber }}
      </template>
      <template v-else>
        Ряд/места:
        <span v-for="(s, i) in booking.seats" :key="i" class="inline-block mr-1">
          {{ s.rowNumber }}-{{ s.seatNumber }}<span v-if="i < booking.seats.length - 1">,</span>
        </span>
      </template>
    </div>

    <!-- 3) Действие -->
    <div class="flex sm:justify-end">
      <button
        v-if="booking.status === 'unpaid'"
        type="button"
        class="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
        @click="$emit('pay', booking.id)"
      >
        Оплатить
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { IBooking } from '@/entities/booking/models/booking'
import type { ISessionAggregate } from '@/entities/session/models/sessionAggregate'
import { computed } from 'vue'
import { formatDateMMDD, formatTimeHHMM } from '@/utils/timeConverter'

const props = defineProps<{
  booking: IBooking
  sessionPage: ISessionAggregate
}>()

defineEmits<{
  (e: 'pay', bookingId: string): void
}>()

const dateTimeText = computed(() => formatDateMMDD(props.sessionPage.session.startTime.getTime()) + ' ' + formatTimeHHMM(props.sessionPage.session.startTime.getTime()))
</script>

<style scoped>
</style>
