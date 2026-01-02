<template>
  <div class="space-y-8">
    <MovieCover v-if="movie" :movie="movie" />
    <MovieCalendar :movie-id="movieId" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import MovieCover from './MovieCover.vue'
import MovieCalendar from '@/features/sessions/ui/MovieCalendar.vue'
import { getMovieById } from '@/features/movie/business/getMovieById'
import type { IMovie } from '@/entities/movie/models/movie'

const props = defineProps<{ movieId: number }>()
const movie = ref<IMovie | null>(null)

onMounted(async () => {
  movie.value = await getMovieById(props.movieId)
})
</script>

