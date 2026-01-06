import { getSettings as apiGetSettings } from '@/shared/api/settings/getSettings'
import type { ISettings } from '@/shared/config/models/settings'
import { fromDto } from '../mappers/fromDto'

export async function getSettings(): Promise<ISettings> {
  const dto = await apiGetSettings()
  return fromDto(dto)
}
