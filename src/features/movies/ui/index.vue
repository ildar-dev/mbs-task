<template>
  <MoviesGrid :movies="movies"/>
</template>

<script setup lang="ts">
import MoviesGrid from './MoviesGrid.vue'

import { ref, onMounted } from 'vue'
import type { IMovie } from '@/entities/movie/models/movie'
import { getMovies } from '../business/getMovies'

const movies = ref<IMovie[]>([])

onMounted(async () => {
  try {
    movies.value = await getMovies()
  } catch (e) {
    console.error(e)
  }
})
</script>
