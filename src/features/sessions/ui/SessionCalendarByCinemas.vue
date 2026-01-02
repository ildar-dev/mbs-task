<template>
  <div class="space-y-6">
    <section v-for="dayTs in sortedDays" :key="dayTs">
      <h3 class="text-lg font-semibold mb-3">
        {{ formatDateMMDD(new Date(Number(dayTs))) }}
      </h3>
      <div class="grid grid-cols-2 gap-4">
        <template v-for="cinemaId in sortedCinemaIds(dayTs)" :key="cinemaId">
          <div class="truncate">
            {{ cinemasById[cinemaId]?.name ?? `#${cinemaId}` }}
          </div>
          <div class="flex flex-wrap gap-2">
            <RouterLink
              v-for="s in matrix[dayTs][cinemaId]"
              :key="s.id"
              class="border border-white px-2 py-1 hover:underline"
              :to="`/session/${s.id}`"
            >
              {{ formatTimeHHMM(s.startTime) }}
            </RouterLink>
          </div>
        </template>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { TSessionsMatrixByDateCinema } from '@/features/sessions/models/sessionsMatrixByDateCinema'
import type { CinemasById } from '@/entities/cinema/models/cinema'

const props = defineProps<{
  matrix: TSessionsMatrixByDateCinema,
  cinemasById: CinemasById
}>()

const sortedDays = computed(() =>
  Object.keys(props.matrix).map(n => Number(n)).sort((a, b) => a - b)
)

function sortedCinemaIds(dayTs: number | string): number[] {
  const ids = Object.keys(props.matrix[Number(dayTs)] ?? {}).map(n => Number(n))
  // сортируем по названию кинотеатра, fallback по id
  return ids.sort((a, b) => {
    const an = props.cinemasById[a]?.name ?? ''
    const bn = props.cinemasById[b]?.name ?? ''
    return an.localeCompare(bn) || a - b
  })
}

function pad2(n: number): string {
  return n < 10 ? `0${n}` : String(n)
}
function formatDateMMDD(d: Date): string {
  return `${pad2(d.getMonth() + 1)}.${pad2(d.getDate())}`
}
function formatTimeHHMM(d: Date): string {
  const h = pad2(d.getHours())
  const m = pad2(d.getMinutes())
  return `${h}:${m}`
}
</script>

