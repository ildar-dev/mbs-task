import { useSettingsStore } from '../models/store'
import { getSettings } from '@/app/settings/business/getSettings'
import type { ISettings } from '@/app/settings/models/settings'

export async function initSettings(): Promise<void> {
  const store = useSettingsStore()
  try {
    const data = (await getSettings()) as ISettings
    store.setSettings(data)
  } catch (e) {
    store.setError(e instanceof Error ? e.message : 'Failed to load settings')
  }
}

