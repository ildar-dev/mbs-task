<template>
  <CinemasGrid :cinemas="cinemas"/>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import CinemasGrid from './CinemasGrid.vue'
import type { ICinema } from '@/features/cinemas/models/cinema'
import { getCinemas } from '@/features/cinemas/business/getCinemas'

const cinemas = ref<ICinema[]>([])

onMounted(async () => {
  cinemas.value = await getCinemas()
})
</script>

