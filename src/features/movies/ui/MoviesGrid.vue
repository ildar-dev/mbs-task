<template>
  <div>
    <div class="grid gap-1 border-b border-white pb-3 mb-4" :style="{ gridTemplateColumns: gridTemplate }">
      <div></div>
      <div class="">Название</div>
      <div class="text-center">Продолжительность</div>
      <div class="text-center">Рейтинг</div>
      <div></div>
    </div>

    <div v-for="m in movies" :key="m.id" class="grid gap-1 items-center py-3" :style="{ gridTemplateColumns: gridTemplate }">
      <div>
        <img v-if="m.posterUrl" :src="m.posterUrl" alt="" class="w-16 h-24 object-cover" />
      </div>
      <div class="truncate">{{ m.title }}</div>
      <div class="text-center">{{ formatTimeHHMM(m.lengthInMs) }}</div>
      <div class="text-center">{{ m.rating }}</div>
      <div>
        <RouterLink class="underline" :to="`/movie/${m.id}`">
          <button class="px-3 whitespace-nowrap">
            Посмотреть сеансы
          </button>
          </RouterLink>
      </div>
    </div>
  </div>
  </template>

<script setup lang="ts">
import type { IMovie } from '@/entities/movie/models/movie'
import { formatTimeHHMM } from '@/utils/time/formatter'

const props = defineProps<{ movies: IMovie[] }>()

const gridTemplate = '80px 1fr 200px 90px 210px';
</script>
