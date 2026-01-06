import { storeToRefs } from 'pinia'
import { useSettingsStore } from '../models/store'

export function useSettings() {
  const store = useSettingsStore()
  const { settings, isLoaded, error, lastLoadedAt } = storeToRefs(store)
  return { settings, isLoaded, error, lastLoadedAt, setSettings: store.setSettings, setError: store.setError }
}
