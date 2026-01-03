<template>
  <div class="space-y-8">
    <CinemaView v-if="cinema" :cinema="cinema" />
    <CinemaCalendar :cinema-id="cinemaId" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import CinemaView from './Cinema.vue'
import CinemaCalendar from '@/features/sessions/ui/CinemaCalendar.vue'
import { getCinemaById } from '@/features/cinema/business/getCinemaById'
import type { ICinema } from '@/entities/cinema/models/cinema'

const props = defineProps<{ cinemaId: number }>()
const cinema = ref<ICinema | null>(null)

onMounted(async () => {
  cinema.value = await getCinemaById(props.cinemaId)
})
</script>

