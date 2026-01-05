<template>
  <DefaultLayout />
</template>
<script setup lang="ts">
import DefaultLayout from '@/shared/ui/layout/default.vue'
import { onMounted } from 'vue'
import { useInitSettings } from '@/app/settings/business/useInitSettings'

const { initSettings } = useInitSettings()
onMounted(() => {
  initSettings();
})
</script>
