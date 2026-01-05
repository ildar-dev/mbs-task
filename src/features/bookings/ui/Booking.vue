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
    <div class="flex sm:justify-end items-center gap-3">
      <span v-if="isUnpaid" class="text-sm text-gray-600 min-w-[72px]">
        Осталось: {{ formatTimeMMSS(remainingMs) }}
      </span>
      <button
        v-if="isUnpaid"
        type="button"
        class="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
        @click="$emit('pay', booking)"
      >
        Оплатить
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { IBooking } from '@/entities/booking/models/booking'
import type { ISessionAggregate } from '@/entities/session/models/sessionAggregate'
import { computed, watch } from 'vue'
import { formatDateMMDD, formatTimeHHMM, formatTimeMMSS } from '@/utils/time/formatter'
import { MS_IN_SECOND } from '@/utils/time/consts'
import { useSettingsStore } from '@/app/settings/models/store'
import { useTick } from '@/shared/utils/composables/useTick'

const props = defineProps<{
  booking: IBooking
  sessionPage: ISessionAggregate
}>()

const emit = defineEmits<{
  (e: 'pay', booking: IBooking): void
  (e: 'expired', bookingId: string): void
}>()

const dateTimeText = computed(() => formatDateMMDD(props.sessionPage.session.startTime.getTime()) + ' ' + formatTimeHHMM(props.sessionPage.session.startTime.getTime()))

const isUnpaid = computed(() => props.booking.status === 'unpaid')

const settingsStore = useSettingsStore()
const paymentWindowMs = computed(() => (settingsStore.settings?.bookingPaymentTimeSeconds ?? 0) * MS_IN_SECOND)
const allowUntil = computed(() => props.booking.bookedAt.getTime() + paymentWindowMs.value)
const remainingMs = computed(() => allowUntil.value - Date.now())

const { start, stop } = useTick(() => {
  if (remainingMs.value <= 0) {
    stop()
    emit('expired', props.booking.id)
  }
}, { intervalMs: MS_IN_SECOND, immediate: true })

watch([isUnpaid, paymentWindowMs], start)
</script>

<style scoped>
</style>
