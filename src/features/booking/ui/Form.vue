<template>
  <div class="flex flex-col gap-4">
    <div class="flex flex-col gap-3" v-if="theater">
      <SeatPeaker
        :theater="theater"
        :booked-seats="bookedSeatsLocal"
        @change="onChangeSeats"
      />
      <div class="flex items-center gap-3">
        <button
          type="button"
          class="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-60"
          :disabled="isSubmitting || selectedSeats.length === 0"
          @click="onSubmit"
        >
          {{ isSubmitting ? 'Бронирование...' : 'Забронировать' }}
        </button>
        <div v-if="submitError" class="text-red-600 text-sm">
          {{ submitError }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { watch, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import SeatPeaker from './SeatPeaker.vue'
import type { ISeat } from '@/entities/theater/models/seat'
import type { ITheater } from '@/entities/theater/models/theater'
import { validateSeatsSelection } from '../business/validation'
import { checkout } from '../business/checkout'
import { useAuth } from '@/features/auth/composables/useAuth'

const props = defineProps<{
  sessionId: number
  theater: ITheater
  bookedSeats: ISeat[]
}>()
const emit = defineEmits<{
  (e: 'success'): void
}>()

const isSubmitting = ref(false)
const submitError = ref<string | null>(null)
const selectedSeats = ref<ISeat[]>([])
const bookedSeatsLocal = ref<ISeat[]>([])
const router = useRouter()
const route = useRoute()
const { isAuthenticated } = useAuth()

// Синхронизируем локальную копию занятых мест с пропсами
watch(
  () => props.bookedSeats,
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
  try {
    submitError.value = null
    if (!isAuthenticated.value) {
      const returnTo = route.fullPath || `/session/${props.sessionId}`
      await router.push({ path: '/login', query: { returnTo } })
      return
    }
    validateSeatsSelection(selectedSeats.value, props.theater, props.bookedSeats);
    isSubmitting.value = true
    await checkout(props.sessionId, selectedSeats.value)
    // Локально обновим занятые места для UX, затем сообщим об успехе
    bookedSeatsLocal.value = [...bookedSeatsLocal.value, ...selectedSeats.value]
    selectedSeats.value = []
    emit('success')
  } catch (e) {
    submitError.value = e instanceof Error ? e.message : 'Не удалось оформить бронь'
  } finally {
    isSubmitting.value = false
  }
}
</script>

<style scoped>
</style>
