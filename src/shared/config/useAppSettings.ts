import { inject, ref, type Ref } from 'vue'
import { SettingsKey } from './consts'
import { type ISettings, defaultSettings } from './models/settings'

export function useAppSettings(): Ref<ISettings> {
  return inject<Ref<ISettings>>(SettingsKey, ref(defaultSettings))
}
