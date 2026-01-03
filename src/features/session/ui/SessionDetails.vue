<template>
  <div class="flex flex-col sm:flex-row gap-4">
    <img
      :src="movie.posterUrl"
      :alt="movie.title"
      class="w-40 h-60 object-cover rounded"
    />
    <div class="flex-1 flex flex-col gap-2">
      <h2 class="text-xl font-semibold">
        {{ movie.title }} ({{ movie.year }})
      </h2>
      <div class="text-sm text-gray-700">
        Рейтинг: <b>{{ movie.rating }}</b>
      </div>
      <div class="text-sm text-gray-700">
        Кинотеатр: <b>{{ cinema.name }}</b>
      </div>
      <div class="text-sm text-gray-700">
        Адрес: <b>{{ cinema.address }}</b>
      </div>
      <div class="text-sm text-gray-700">
        Время начала: <b>{{ new Date(session.startTime).toLocaleString() }}</b>
      </div>
      <p class="text-sm text-gray-800 mt-2">
        {{ movie.description }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ISessionDetails } from '@/entities/session/models/sessionDetails'
import type { IMovie } from '@/entities/movie/models/movie'
import type { ICinema } from '@/entities/cinema/models/cinema'

defineProps<{
  session: ISessionDetails
  movie: IMovie
  cinema: ICinema
}>()
</script>

<style scoped>
</style>
