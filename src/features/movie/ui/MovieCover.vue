<template>
  <div>
    <h2 class="text-4xl mb-7 text-center">{{ movie.title }}</h2>
    <div class="grid gap-7" style="grid-template-columns: 140px 1fr;">
      <div>
        <img v-if="movie.posterUrl" :src="movie.posterUrl" alt="" class="object-cover" />
      </div>
      <div>
        <p>{{ movie.description }}</p>
        <div class="mt-3">Год: {{ movie.year }}</div>
        <div>Длительность: {{ formatTimehHMM(movie.lengthInMs) }}</div>
        <div>Рейтинг: {{ movie.rating }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { IMovie } from '@/entities/movie/models/movie'
import { formatTimehHMM } from '@/utils/time/formatter'
const props = defineProps<{ movie: IMovie }>()
</script>
