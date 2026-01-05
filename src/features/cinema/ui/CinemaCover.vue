<template>
  <div>
    <h2 class="text-4xl mb-4 border-b border-white pb-10 text-center">{{ cinema.name }}</h2>
  </div>
</template>

<script setup lang="ts">
import type { ICinema } from '@/entities/cinema/models/cinema'
const props = defineProps<{ cinema: ICinema }>()
</script>
