<template>
  <div class="container mx-auto p-4 flex flex-col gap-6">
    <div v-if="Number.isNaN(sessionId)" class="text-red-600">
      Некорректный идентификатор сеанса
    </div>
    <div v-else>
      <div v-if="isLoading" class="text-gray-500">Загрузка...</div>
      <div v-else-if="error" class="text-red-600">{{ error }}</div>
      <template v-else-if="sessionAggregate">
        <CheckoutForm
          :session-aggregate="sessionAggregate"
          @success="handleBookedSuccess"
        />
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import CheckoutForm from '@/features/checkout/ui/Form.vue'

import { getSessionAggregateById } from '@/entities/session/repository/getSessionAggregate'
import type { ISessionAggregate } from '@/entities/session/models/sessionAggregate'

const route = useRoute()
const router = useRouter()
const sessionId = Number(route.params.id)
const sessionAggregate = ref<ISessionAggregate | null>(null)
const isLoading = ref(false)
const error = ref<unknown>(null)

async function load() {
  try {
    isLoading.value = true
    error.value = null
    sessionAggregate.value = await getSessionAggregateById(sessionId)
  } catch (e) {
    error.value = e instanceof Error ? (e.message) : 'Не удалось загрузить сеанс'
  } finally {
    isLoading.value = false
  }
}

onMounted(load)

function handleBookedSuccess() {
  router.push(`/bookings`)
}
</script>

<style scoped>
</style>
