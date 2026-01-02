<template>
  <div>
    <h2 class="text-2xl mb-4">{{ cinema.name }}</h2>
    <div class="opacity-90" v-if="cinema.address">Адрес: {{ cinema.address }}</div>
  </div>
</template>

<script setup lang="ts">
import type { ICinema } from '@/entities/cinema/models/cinema'
const props = defineProps<{ cinema: ICinema }>()
</script>
