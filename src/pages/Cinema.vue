<template>
  <div>
    <CinemaFeature :cinema-id="cinemaId" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import CinemaFeature from '@/features/cinema/ui/index.vue'

const route = useRoute()
const cinemaId = computed(() => Number(route.params.id))
</script>

