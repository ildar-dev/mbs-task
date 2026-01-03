import { getCinemas as apiGetCinemas } from '@/shared/api/cinemas/getCinemas'
import type { ICinema } from '@/entities/cinema/models/cinema'

export async function getCinemas(): Promise<ICinema[]> {
  return await apiGetCinemas()
}
