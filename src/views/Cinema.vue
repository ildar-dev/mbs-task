<template>
  <div class="space-y-8 p-6">
    <CinemaFeature v-if="cinema" :cinema="cinema" />
    <SessionCalendarByMovies
      v-if="matrix && Object.keys(matrix).length"
      :matrix="matrix"
      :movies-by-id="moviesById"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import CinemaFeature from '@/features/cinema/ui/Cinema.vue'
import SessionCalendarByMovies from '@/features/sessions/ui/SessionCalendarByMovies.vue'
import { getCinemaById } from '@/features/cinema/business/getCinemaById'
import { getMovies } from '@/shared/api/movies/getMovies'
import { mapDtoToMovie } from '@/entities/movie/mappers/fromDto'
import { getSessionsByCinema } from '@/shared/api/sessions/sessionsByCinema'
import { mapDtoToSession } from '@/entities/session/mappers/fromDto'
import { groupedSessionsByDateMovie } from '@/features/sessions/business/getGroupedSessions'
import type { ICinema } from '@/entities/cinema/models/cinema'
import type { IMovie } from '@/entities/movie/models/movie'
import type { TSessionsMatrixByDateMovie } from '@/features/sessions/models/sessionsMatrixByDateMovie'

const route = useRoute()
const cinema = ref<ICinema | null>(null)
const moviesById = ref<Record<IMovie['id'], IMovie>>({})
const matrix = ref<TSessionsMatrixByDateMovie>({})

onMounted(async () => {
  const id = Number(route.params.id)
  cinema.value = await getCinemaById(id)

  const [moviesDto, sessionsDto] = await Promise.all([
    getMovies(),
    getSessionsByCinema(id),
  ])
  const movies = moviesDto.map(mapDtoToMovie)
  moviesById.value = Object.fromEntries(movies.map(m => [m.id, m]))
  matrix.value = groupedSessionsByDateMovie(sessionsDto.map(mapDtoToSession))
})
</script>

