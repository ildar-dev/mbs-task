<template>
  <div class="space-y-6">
    <section v-for="dayTs in sortedDays" :key="dayTs">
      <h3 class="text-lg font-semibold mb-3">
        {{ formatDateMMDD(new Date(Number(dayTs))) }}
      </h3>
      <div class="grid grid-cols-2 gap-4">
        <template v-for="movieId in sortedMovieIds(dayTs)" :key="movieId">
          <div class="truncate">
            {{ moviesById[movieId]?.title ?? `#${movieId}` }}
          </div>
          <div class="flex flex-wrap gap-2">
            <RouterLink
              v-for="s in matrix[dayTs][movieId]"
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
import type { TSessionsMatrixByDateMovie } from '@/features/sessions/models/sessionsMatrixByDateMovie'
import type { IMovie } from '@/entities/movie/models/movie'

const props = defineProps<{
  matrix: TSessionsMatrixByDateMovie,
  moviesById: Record<IMovie['id'], IMovie>
}>()

const sortedDays = computed(() =>
  Object.keys(props.matrix).map(n => Number(n)).sort((a, b) => a - b)
)

function sortedMovieIds(dayTs: number | string): number[] {
  const ids = Object.keys(props.matrix[Number(dayTs)] ?? {}).map(n => Number(n))
  return ids.sort((a, b) => {
    const an = props.moviesById[a]?.title ?? ''
    const bn = props.moviesById[b]?.title ?? ''
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

