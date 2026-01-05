<template>
  <div class="grid gap-3 items-center py-3" style="grid-template-columns: 1fr 1fr 2fr;">
    <div class="flex flex-col">
      <div>{{ sessionPage.movie.title }}</div>
      <div>{{ sessionPage.cinema.name }}</div>
      <div>{{ dateTimeText }}</div>
    </div>

    <div class="my-auto">
        <span v-for="(s, i) in booking.seats" :key="i" class="inline-block mr-1">
          Ряд {{ s.rowNumber }}, место {{ s.seatNumber }}
        </span>
    </div>

    <div class="flex items-center gap-10">
      <button
        v-if="isUnpaid"
        type="button"
        class="base px-4 py-2"
        @click="$emit('pay', booking)"
      >
        Оплатить
      </button>
      <span v-if="isUnpaid" class="">
        Осталось: {{ formatTimeMMSS(remainingMs) }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { IBooking } from '@/entities/booking/models/booking'
import type { ISessionAggregate } from '@/entities/session/models/sessionAggregate'
import { computed, watch, ref } from 'vue'
import { formatDateMMDD, formatTimehHMM, formatTimeMMSS } from '@/utils/time/formatter'
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

const dateTimeText = computed(() => formatDateMMDD(props.sessionPage.session.startTime.getTime()) + ' ' + formatTimehHMM(props.sessionPage.session.startTime.getTime()))

const isUnpaid = computed(() => props.booking.status === 'unpaid')

const settingsStore = useSettingsStore()
const paymentWindowMs = computed(() => (settingsStore.settings?.bookingPaymentTimeSeconds ?? 0) * MS_IN_SECOND)
const allowUntil = computed(() => props.booking.bookedAt.getTime() + paymentWindowMs.value)
const nowMs = ref(Date.now())
const remainingMs = computed(() => allowUntil.value - nowMs.value)

const { start, stop } = useTick(() => {
  nowMs.value = Date.now()
  if (remainingMs.value <= 0) {
    stop()
    emit('expired', props.booking.id)
  }
}, { intervalMs: MS_IN_SECOND, immediate: true })

watch([isUnpaid, paymentWindowMs], () => {
  if (isUnpaid.value && remainingMs.value > 0) {
    start()
  } else {
    stop()
  }
}, { immediate: true })
</script>

<style scoped>
</style>
