import { getCinemasCached } from '@/entities/cinema/repository/getCinema'
import type { ICinema } from '@/entities/cinema/models/cinema'

export async function getCinemas(): Promise<ICinema[]> {
  return await getCinemasCached()
}
