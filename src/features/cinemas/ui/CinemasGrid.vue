<template>
  <div>
    <div class="grid grid-cols-3 gap-4 border-b border-white pb-3 mb-4">
      <div class="font-semibold">Кинотеатр</div>
      <div class="font-semibold">Адрес</div>
      <div></div>
    </div>

    <div v-for="c in cinemas" :key="c.id" class="grid grid-cols-3 gap-4 items-center py-3 border-b border-white/20">
      <div class="truncate">{{ c.name }}</div>
      <div class="truncate">{{ c.address }}</div>
      <div>
        <RouterLink class="underline" :to="`/cinemas/${c.id}`">Посмотреть сеансы</RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ICinema } from '@/entities/cinema/models/cinema'

const props = defineProps<{
  cinemas: ICinema[]
}>()
</script>

