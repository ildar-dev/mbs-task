<template>
  <div>
    <div class="grid grid-cols-5 gap-4 border-b border-white pb-3 mb-4">
      <div></div>
      <div class="font-semibold">Название</div>
      <div class="font-semibold">Продолжительность</div>
      <div class="font-semibold">Рейтинг</div>
      <div></div>
    </div>

    <div v-for="m in movies" :key="m.id" class="grid grid-cols-5 gap-4 items-center py-3 border-b border-white/20">
      <div>
        <img v-if="m.posterUrl" :src="m.posterUrl" alt="" class="w-16 h-24 object-cover" />
      </div>
      <div class="truncate">{{ m.title }}</div>
      <div>{{ formatTimeHHMM(m.lengthInMs) }}</div>
      <div>{{ m.rating }}</div>
      <div>
        <RouterLink class="underline" :to="`/movie/${m.id}`">Посмотреть сеансы</RouterLink>
      </div>
    </div>
  </div>
  </template>

<script setup lang="ts">
import type { IMovie } from '@/entities/movie/models/movie'
import { formatTimeHHMM } from '@/utils/timeConverter'
const props = defineProps<{ movies: IMovie[] }>()
</script>
