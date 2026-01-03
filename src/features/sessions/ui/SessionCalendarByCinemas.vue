<template>
  <div class="space-y-6">
    <section v-for="dayTs in sortedDays" :key="dayTs">
      <h3 class="text-lg font-semibold mb-3">
        {{ formatDateMMDD(Number(dayTs)) }}
      </h3>
      <div class="grid grid-cols-2 gap-4">
        <template v-for="cinemaId in cinemaIds(dayTs)" :key="cinemaId">
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
import type { TSessionsMatrixByDateCinema } from '@/features/sessions/models/sessionsMatrixByDateCinema'
import type { TCinemaDictionary } from '@/features/sessions/models/cinemaDictionary'
import { formatDateMMDD, formatTimeHHMM } from '@/utils/timeConverter'

const props = defineProps<{
  matrix: TSessionsMatrixByDateCinema,
  cinemasById: TCinemaDictionary
}>()

const sortedDays = computed(() =>
  Object.keys(props.matrix).map(n => Number(n)).sort((a, b) => a - b)
)

function cinemaIds(dayTs: number | string): number[] {
  return Object.keys(props.matrix[Number(dayTs)] ?? {}).map(n => Number(n))
}

</script>

