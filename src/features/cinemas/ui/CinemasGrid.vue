<template>
  <div>
    <div class="grid gap-1 border-b border-white py-3 mb-4" :style="{ gridTemplateColumns: gridTemplate }">
      <div class="pl-5">Кинотеатр</div>
      <div class="pl-5">Адрес</div>
      <div></div>
    </div>

    <div
      v-for="c in cinemas"
      :key="c.id"
      class="grid gap-1 items-center py-5"
      :style="{ gridTemplateColumns: gridTemplate }"
    >
      <div class="text-xl truncate pl-5">{{ c.name }}</div>
      <div class="text-xl truncate">{{ c.address }}</div>
      <div class="text-center pr-5">
        <RouterLink :to="`/cinema/${c.id}`">
          <button class="px-3 whitespace-nowrap">Посмотреть сеансы</button>
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ICinema } from '@/entities/cinema/models/cinema'

const props = defineProps<{ cinemas: ICinema[] }>()
const gridTemplate = '1fr 2fr 220px'
</script>

