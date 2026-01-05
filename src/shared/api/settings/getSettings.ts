import { apiClient } from '../client'
import type { IDtoSettings } from './models/settings'

export async function getSettings(): Promise<IDtoSettings> {
  const result = await apiClient.get<IDtoSettings>('/settings')
  return result.data
}
