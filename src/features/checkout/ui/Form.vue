<template>
  <form class="flex flex-col gap-4" @submit.prevent="onSubmit">
    <h2 class="text-4xl mb-7 text-center">Выбрать места</h2>
    <div class="flex flex-col gap-3" v-if="sessionAggregate.session.theater">
      <div>
        <p>Фильм: {{ sessionAggregate.movie.title }}</p>
        <p>Кинотеатр: {{ sessionAggregate.cinema.name }}</p>
        <p>Время: {{ timeText }}</p>
      </div>
      <SeatPeakerContainer class="max-w-[700px] max-h-[400px]">
          <SeatPeaker
            :theater="sessionAggregate.session.theater"
            :booked-seats="bookedSeatsLocal"
            @change="onChangeSeats"
          />
      </SeatPeakerContainer>
      <div class="flex items-center gap-3">
        <button
          type="submit"
          class="base mx-auto mt-6"
          :disabled="isSubmitting || selectedSeats.length === 0"
        >
          Забронировать
        </button>
        <div v-if="submitError" class="text-red-600 text-sm">
          {{ submitError }}
        </div>
      </div>
    </div>
  </form>
</template>

<script setup lang="ts">
import { watch, ref, computed } from 'vue'
import SeatPeaker from './SeatPeaker.vue'
import SeatPeakerContainer from './SeatPeakerContainer.vue'

import type { ISeat } from '@/entities/theater/models/seat'
import type { ISessionAggregate } from '@/entities/session/models/sessionAggregate'
import { useAuthRedirect } from '@/shared/router/useAuthRedirect'

import { validateSeatsSelection } from '../business/validation'
import { checkout } from '../business/checkout'
import { formatTimeHHMM, formatDateMMDD } from '@/utils/time/formatter'

import { useAuth } from '@/features/auth/composables/useAuth'


const props = defineProps<{
  sessionAggregate: ISessionAggregate
}>()
const emit = defineEmits<{
  (e: 'success'): void
}>()

const isSubmitting = ref(false)
const submitError = ref<string | null>(null)
const selectedSeats = ref<ISeat[]>([])
const bookedSeatsLocal = ref<ISeat[]>([])
const { isAuthenticated } = useAuth()
const { toLogin } = useAuthRedirect()

const timeText = computed(() => {
  return formatDateMMDD(props.sessionAggregate.session.startTime.getTime()) + ' ' + formatTimeHHMM(props.sessionAggregate.session.startTime.getTime())
})

// Синхронизируем локальную копию занятых мест с пропсами
watch(
  () => props.sessionAggregate.session.bookedSeats,
  (next: ISeat[]) => {
    bookedSeatsLocal.value = next.slice()
  },
  { immediate: true, deep: true }
)

function onChangeSeats(seats: ISeat[]) {
  selectedSeats.value = seats
  submitError.value = null
}

async function onSubmit() {
  if (isSubmitting.value || selectedSeats.value.length === 0) return
  try {
    submitError.value = null
    if (!isAuthenticated.value) {
      await toLogin(`/session/${props.sessionAggregate.session.id}`)
      return
    }
    validateSeatsSelection(
      selectedSeats.value,
      props.sessionAggregate.session.theater,
      props.sessionAggregate.session.bookedSeats
    );
    isSubmitting.value = true
    try {
      await checkout(props.sessionAggregate.session.id, selectedSeats.value)
      emit('success')
    } catch (e) {
      submitError.value = e instanceof Error ? e.message : 'Не удалось оформить бронь'
    } finally {
      isSubmitting.value = false
    }
  } catch (e) {
    submitError.value = e instanceof Error ? e.message : 'Не удалось оформить бронь'
  } finally {
    isSubmitting.value = false
  }
}
</script>
