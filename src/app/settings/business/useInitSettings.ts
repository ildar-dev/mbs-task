import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useSettingsStore } from '../models/store'
import { getSettings } from '@/app/settings/business/getSettings'
import type { ISettings } from '@/app/settings/models/settings'

export function useInitSettings() {
  const store = useSettingsStore()
  const { settings, isLoaded, error } = storeToRefs(store)
  const isInitializing = ref(false)

  async function initSettings(): Promise<void> {
    if (isInitializing.value) return
    isInitializing.value = true
    try {
      const data = (await getSettings()) as ISettings
      store.setSettings(data)
    } catch (e) {
      store.setError(e instanceof Error ? e.message : 'Failed to load settings')
    } finally {
      isInitializing.value = false
    }
  }

  return { initSettings, isInitializing, settings, isLoaded, error }
}
