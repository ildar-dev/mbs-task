import { getCinemaById as getCinemaByIdRepository } from '@/entities/cinema/repository/getCinema'
import type { ICinema } from '@/entities/cinema/models/cinema'

export async function getCinemaById(id: number): Promise<ICinema | null> {
  return getCinemaByIdRepository(id)
}
