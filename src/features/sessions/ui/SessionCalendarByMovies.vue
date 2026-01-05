<template>
  <div class="space-y-6">
    <section v-for="dayTs in sortedDays" :key="dayTs">
      <h3 class="text-lg font-semibold mb-3">
        {{ formatDateMMDD(Number(dayTs)) }}
      </h3>
      <div class="grid grid-cols-2 gap-4">
        <template v-for="movieId in movieIds(dayTs)" :key="movieId">
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
              {{ formatTimeHHMM(s.startTime.getTime()) }}
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
import { formatDateMMDD, formatTimeHHMM } from '@/utils/time/formatter'

const props = defineProps<{
  matrix: TSessionsMatrixByDateMovie,
  moviesById: Record<IMovie['id'], IMovie>
}>()

const sortedDays = computed(() =>
  Object.keys(props.matrix).map(n => Number(n)).sort((a, b) => a - b)
)

function movieIds(dayTs: number | string): number[] {
  return Object.keys(props.matrix[Number(dayTs)] ?? {}).map(n => Number(n))
}
</script>

