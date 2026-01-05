<template>
  <CinemasGrid :cinemas="cinemas"/>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import CinemasGrid from './CinemasGrid.vue'
import type { ICinema } from '@/entities/cinema/models/cinema'
import { getCinemas } from '@/features/cinemas/business/getCinemas'

const cinemas = ref<ICinema[]>([])

onMounted(async () => {
  try {
    cinemas.value = await getCinemas()
  } catch (e) {
    console.error(e)
  }
})
</script>

