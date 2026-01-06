import { ref } from 'vue'
import { getSettings } from '@/app/settings/business/getSettings'
import type { ISettings } from '@/shared/config/models/settings'
import { useSettings } from './useSettings'

export function useInitSettings() {
  const { settings, isLoaded, error, setSettings, setError } = useSettings()
  const isInitializing = ref(false)

  async function initSettings(): Promise<void> {
    if (isInitializing.value) return
    isInitializing.value = true
    try {
      const data = (await getSettings()) as ISettings
      setSettings(data)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to load settings')
    } finally {
      isInitializing.value = false
    }
  }

  return { initSettings, isInitializing, settings, isLoaded, error }
}
