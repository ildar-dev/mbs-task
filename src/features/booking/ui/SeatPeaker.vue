<template>
  <div class="flex flex-col items-center gap-3">
    <div
      class="grid gap-1 sm:gap-1.5"
      :style="{
        gridTemplateColumns: `repeat(${props.theater.size.seatsPerRow}, minmax(0, 1fr))`,
      }"
      role="grid"
      aria-label="Схема зала"
    >
      <button
        v-for="cell in cells"
        :key="cell.key"
        type="button"
        role="gridcell"
        :aria-label="`Ряд ${cell.rowDisplay}, Место ${cell.seatDisplay}`"
        :disabled="cell.booked"
        @click="onToggle(cell.row, cell.seat)"
        class="flex items-center justify-center select-none rounded text-xs sm:text-sm font-medium h-8 w-8 sm:h-10 sm:w-10 transition-colors"
        :class="{
          'bg-red-500 text-white cursor-not-allowed opacity-80': cell.booked,
          'bg-blue-600 text-white': !cell.booked && isSelected(cell.row, cell.seat),
          'bg-gray-200 hover:bg-gray-300': !cell.booked && !isSelected(cell.row, cell.seat),
        }"
      >
        {{ cell.seatDisplay }}
      </button>
    </div>

    <div class="flex gap-4 text-sm text-gray-600">
      <div class="flex items-center gap-2">
        <span class="inline-block h-4 w-4 rounded bg-gray-300"></span>
        <span>Свободно</span>
      </div>
      <div class="flex items-center gap-2">
        <span class="inline-block h-4 w-4 rounded bg-blue-600"></span>
        <span>Выбрано</span>
      </div>
      <div class="flex items-center gap-2">
        <span class="inline-block h-4 w-4 rounded bg-red-500"></span>
        <span>Забронировано</span>
      </div>
    </div>
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

const cells = computed(() => {
  const list: Array<{
    key: string
    row: number
    seat: number
    rowDisplay: number
    seatDisplay: number
    booked: boolean
  }> = []
  const rows = props.theater.size.rows
  const seatsPerRow = props.theater.size.seatsPerRow
  for (let r = 0; r < rows; r++) {
    for (let s = 0; s < seatsPerRow; s++) {
      const key = toKey(r, s)
      list.push({
        key,
        row: r,
        seat: s,
        rowDisplay: r + 1,
        seatDisplay: s + 1,
        booked: bookedKeys.value.has(key),
      })
    }
  }
  return list
})

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
