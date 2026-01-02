<template>
  <div>
    <h2 class="text-2xl mb-4">{{ movie.title }}</h2>
    <div class="grid grid-cols-3 gap-6">
      <div>
        <img v-if="movie.posterUrl" :src="movie.posterUrl" alt="" class="w-48 h-72 object-cover" />
      </div>
      <div class="col-span-2 space-y-3">
        <p class="opacity-90">{{ movie.description }}</p>
        <div>Год: {{ movie.year }}</div>
        <div>Длительность: {{ formatTime(movie.lengthInMs) }}</div>
        <div>Рейтинг: {{ movie.rating }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { IMovie } from '@/entities/movie/models/movie'
import { formatTime } from '@/utils/timeConverter'
const props = defineProps<{ movie: IMovie }>()
</script>
