<template>
  <div class="container mx-auto p-4 flex flex-col gap-6">
    <div v-if="Number.isNaN(sessionId)" class="text-red-600">
      Некорректный идентификатор сеанса
    </div>
    <div v-else>
      <div v-if="isLoading" class="text-gray-500">Загрузка...</div>
      <div v-else-if="error" class="text-red-600">Ошибка загрузки</div>
      <template v-else-if="page">
        <SessionDetails
          :session="page.session"
          :movie="page.movie"
          :cinema="page.cinema"
        />
        <div class="h-px bg-gray-200 my-2"></div>
        <BookingForm
          :session-id="sessionId"
          :theater="page.session.theater"
          :booked-seats="page.session.bookedSeats"
          @success="handleBookedSuccess"
        />
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import SessionDetails from '@/features/session/ui/SessionDetails.vue'
import BookingForm from '@/features/booking/ui/Form.vue'
import { getSessionPageById } from '@/features/session/business/getSessionPageById'
import type { ISessionPage } from '@/features/session/models/sessionPage'

const route = useRoute()
const sessionId = Number(route.params.id)

const isLoading = ref(false)
const error = ref<unknown>(null)
const page = ref<ISessionPage | null>(null)

async function load() {
  try {
    isLoading.value = true
    error.value = null
    page.value = await getSessionPageById(sessionId)
  } catch (e) {
    error.value = e
  } finally {
    isLoading.value = false
  }
}

onMounted(load)

function handleBookedSuccess() {
  // После успешной брони обновим данные сеанса (занятые места)
  void load()
}
</script>

<style scoped>
</style>
