<template>
        <div
          class="grid gap-4"
          :style="{
            gridTemplateColumns: `max-content repeat(${props.theater.size.seatsPerRow}, 40px)`,
          }"
        >
          <!-- верхняя пустая ячейка + номера мест -->
          <div></div>
          <div
            v-for="seat in seatNumbers"
            :key="`h-${seat}`"
            class="text text-center select-none h-4 sm:h-5 flex items-center justify-center"
          >
            {{ seat }}
          </div>

          <!-- ряды: слева метка 'ряд N' + места -->
          <template v-for="row in rowNumbers" :key="`r-${row}`">
            <div class="text-sm text-right select-none whitespace-nowrap h-full flex items-center">
              ряд {{ row }}
            </div>
            <button
              v-for="seat in seatNumbers"
              :key="toKey(row, seat)"
              type="button"
              :aria-label="`Ряд ${row}, Место ${seat}`"
              :disabled="bookedKeys.has(toKey(row, seat))"
              @click="onToggle(row, seat)"
              class="select-none p-0 h-full aspect-square transition-colors rounded-lg border border-white"
              :class="{
                'bg-red-300 text-white cursor-not-allowed opacity-80': bookedKeys.has(toKey(row, seat)),
                'bg-blue-900 text-white': !bookedKeys.has(toKey(row, seat)) && isSelected(row, seat),
                '': !bookedKeys.has(toKey(row, seat)) && !isSelected(row, seat),
              }"
            >
            </button>
          </template>
        </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import type { ITheater } from '@/entities/theater/models/theater'
import type { ISeat } from '@/entities/theater/models/seat'

const props = defineProps<{
  theater: ITheater
  bookedSeats: ISeat[]
}>()

const emit = defineEmits<{
  (e: 'change', seats: ISeat[]): void
}>()

function toKey(row: number, seat: number): string {
  return `${row}:${seat}`
}

const selectedKeys = ref<Set<string>>(new Set())

const bookedKeys = computed<Set<string>>(() => {
  const s = new Set<string>()
  for (const b of props.bookedSeats ?? []) {
    s.add(toKey(b.rowNumber, b.seatNumber))
  }
  return s
})

const rowNumbers = computed<number[]>(() =>
  Array.from({ length: props.theater.size.rows }, (_, i) => i + 1)
)
const seatNumbers = computed<number[]>(() =>
  Array.from({ length: props.theater.size.seatsPerRow }, (_, i) => i + 1)
)

function isSelected(row: number, seat: number): boolean {
  return selectedKeys.value.has(toKey(row, seat))
}

function onToggle(row: number, seat: number): void {
  const key = toKey(row, seat)
  if (bookedKeys.value.has(key)) return
  const next = new Set(selectedKeys.value)
  if (next.has(key)) next.delete(key)
  else next.add(key)
  selectedKeys.value = next
  emitSelected()
}

function emitSelected(): void {
  const keys = Array.from(selectedKeys.value.values()) as string[]
  const result: ISeat[] = keys.map((k) => {
    const [row, seat] = k.split(':').map(Number)
    return { rowNumber: row, seatNumber: seat }
  })
  emit('change', result)
}

// Если извне обновились забронированные места, снимаем выбор с тех, что занялись
watch(
  () => props.bookedSeats,
  () => {
    const next = new Set<string>()
    for (const key of selectedKeys.value) {
      if (!bookedKeys.value.has(key)) next.add(key)
    }
    if (next.size !== selectedKeys.value.size) {
      selectedKeys.value = next
      emitSelected()
    }
  },
  { deep: true }
)
</script>

<style scoped>
</style>
