<template>
  <SessionCalendarByMovies
    v-if="matrix && Object.keys(matrix).length"
    :matrix="matrix"
    :movies-by-id="moviesById"
  />
</template>

<script setup lang="ts">
import { ref, onMounted, watch, toRef } from 'vue'
import SessionCalendarByMovies from '@/features/sessions/ui/SessionCalendarByMovies.vue'
import { getCalendarByMoviesForCinema } from '@/features/sessions/business/getCalendarByMoviesForCinema'
import type { TMovieDictionary } from '@/features/sessions/models/movieDictionary'
import type { TSessionsMatrixByDateMovie } from '@/features/sessions/models/sessionsMatrixByDateMovie'

const props = defineProps<{ cinemaId: number }>()

const moviesById = ref<TMovieDictionary>({})
const matrix = ref<TSessionsMatrixByDateMovie>({})

async function load(id: number) {
  const { moviesById: dict, matrix: m } = await getCalendarByMoviesForCinema(id)
  moviesById.value = dict
  matrix.value = m
}

onMounted(() => load(props.cinemaId))
watch(toRef(props, 'cinemaId'), (id: number) => { if (id) load(id) })
</script>

