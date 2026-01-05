<template>
<div class="overflow-hidden">
  <div
    class="spc relative spc-scroll overflow-auto"
    :style="{ width, height }"
  >
    <div class="spc-content inline-block">
      <slot />
    </div>
  </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  width?: string
  height?: string
}>()

const width = computed(() => props.width ?? '100%')
const height = computed(() => props.height ?? '70vh')
</script>

<style scoped>
/* Firefox */
.spc-scroll {
  scrollbar-width: thin;
  scrollbar-color: #9ca3af transparent; /* thumb, track */
  border: 0.5px solid #6b7280;
  padding: 10px;
}

/* Защита от «выпадания»: контент как единый блок */
.spc-content {
  max-width: max-content;
  max-height: max-content;
}
</style>
