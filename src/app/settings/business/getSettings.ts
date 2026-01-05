import { getSettings as apiGetSettings } from '@/shared/api/settings/getSettings'
import type { ISettings } from '../models/settings'

export async function getSettings(): Promise<ISettings> {
  return await apiGetSettings()
}
