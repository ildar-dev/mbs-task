<template>
  <div>
    <MovieFeature :movie-id="movieId" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import MovieFeature from '@/features/movie/ui/index.vue'

const route = useRoute()
const movieId = computed(() => Number(route.params.id))
</script>

