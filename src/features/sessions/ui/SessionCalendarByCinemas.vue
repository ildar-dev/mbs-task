<template>
  <div class="space-y-8">
    <section v-for="dayTs in sortedDays" :key="dayTs">
      <h3 class="text-lg mb-3 border-b border-white pb-3 pl-7">
        {{ formatDateMMDD(Number(dayTs)) }}
      </h3>
      <div class="grid gap-4 pl-7" style="grid-template-columns: 1fr 1fr;">
        <template v-for="cinemaId in cinemaIds(dayTs)" :key="cinemaId">
          <div class="truncate my-auto">
            {{ cinemasById[cinemaId]?.name ?? `#${cinemaId}` }}
          </div>
          <div class="flex flex-wrap gap-5 my-auto">
            <RouterLink
              v-for="s in matrix[dayTs][cinemaId]"
              :key="s.id"
              :to="`/session/${s.id}`"
            >
              <button class="base px-3 whitespace-nowrap min-w-[80px]">
                {{ formatTimeHHMM(s.startTime.getTime()) }}
              </button>
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
import { formatDateMMDD, formatTimeHHMM } from '@/utils/time/formatter'

const props = defineProps<{
  matrix: TSessionsMatrixByDateCinema,
  cinemasById: TCinemaDictionary,
  columnsTemplate?: string,
}>()

const sortedDays = computed(() =>
  Object.keys(props.matrix).map(n => Number(n)).sort((a, b) => a - b)
)

function cinemaIds(dayTs: number | string): number[] {
  return Object.keys(props.matrix[Number(dayTs)] ?? {}).map(n => Number(n))
}
</script>

