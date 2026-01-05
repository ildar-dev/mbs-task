import { defineStore } from 'pinia'
import type { ISettings } from '@/app/settings/models/settings'

type TSettingsState = {
  settings: ISettings | null
  isLoaded: boolean
  error: string | null
  lastLoadedAt: number | null
}

export const useSettingsStore = defineStore('settings', {
  state: (): TSettingsState => ({
    settings: null,
    isLoaded: false,
    error: null,
    lastLoadedAt: null,
  }),
  actions: {
    setSettings(payload: ISettings) {
      this.settings = payload
      this.isLoaded = true
      this.error = null
      this.lastLoadedAt = Date.now()
    },
    setError(message: string) {
      this.error = message
      this.isLoaded = false
    },
    reset() {
      this.settings = null
      this.isLoaded = false
      this.error = null
      this.lastLoadedAt = null
    },
  },
  persist: {
    paths: ['settings', 'lastLoadedAt'],
  },
})
