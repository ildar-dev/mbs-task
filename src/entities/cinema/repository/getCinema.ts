import { getCinemas as apiGetCinemas } from '@/shared/api/cinemas/getCinemas'
import type { ICinema } from '@/entities/cinema/models/cinema'

export async function getCinemaById(id: number): Promise<ICinema | null> {
  return (await apiGetCinemas()).find(c => c.id === id) || null; // TODO: throw error if not found
}
