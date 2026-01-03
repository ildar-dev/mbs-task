<template>
  <SessionCalendarByCinemas
    v-if="matrix && Object.keys(matrix).length"
    :matrix="matrix"
    :cinemas-by-id="cinemasById"
  />
</template>

<script setup lang="ts">
import { ref, onMounted, watch, toRef } from 'vue'
import SessionCalendarByCinemas from '@/features/sessions/ui/SessionCalendarByCinemas.vue'
import { getCalendarByCinemasForMovie } from '@/features/sessions/business/getCalendarByCinemasForMovie'
import type { TCinemaDictionary } from '@/features/sessions/models/cinemaDictionary'
import type { TSessionsMatrixByDateCinema } from '@/features/sessions/models/sessionsMatrixByDateCinema'

const props = defineProps<{ movieId: number }>()

const cinemasById = ref<TCinemaDictionary>({})
const matrix = ref<TSessionsMatrixByDateCinema>({})

async function load(id: number) {
  const { cinemasById: dict, matrix: m } = await getCalendarByCinemasForMovie(id)
  cinemasById.value = dict
  matrix.value = m
}

onMounted(() => load(props.movieId))
watch(toRef(props, 'movieId'), (id: number) => { if (id) load(id) })
</script>

