<template>
  <MoviesGrid :movies="movies" />
</template>

<script setup lang="ts">
import MoviesGrid from './MoviesGrid.vue'

import { ref, onMounted } from 'vue'
import type { IMovie } from '../models/movie'
import { getMovies } from '../business/getMovies'

const movies = ref<IMovie[]>([])

onMounted(async () => {
  movies.value = await getMovies()
})
</script>

