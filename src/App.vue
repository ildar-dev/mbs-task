<template>
  <DefaultLayout />
</template>
<script setup lang="ts">
import DefaultLayout from '@/shared/ui/layout/default.vue'
import { onMounted } from 'vue'
import { initSettings } from '@/app/settings/business/initSettings'

onMounted(() => {
  initSettings();
})
</script>
