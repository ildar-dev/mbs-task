import { getCinemas as apiGetCinemas } from '@/shared/api/cinemas/getCinemas'
import type { IDtoCinemasResponse } from '@/shared/api/cinemas/models'

export async function getCinemas(): Promise<IDtoCinemasResponse> {
  return await apiGetCinemas()
}
