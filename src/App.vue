<template>
  <DefaultLayout />
</template>
<script setup lang="ts">
import DefaultLayout from '@/shared/ui/layout/default.vue'
import { onMounted, provide } from 'vue'
import { useInitSettings } from '@/app/settings/business/useInitSettings'
import { SettingsKey } from '@/shared/config/consts'

const { initSettings, settings } = useInitSettings()

provide(SettingsKey, settings)

onMounted(() => {
  initSettings();
})
</script>
