import { getMovieById as getMovieByIdRepository } from '@/entities/movie/repository/getMovie'
import type { IMovie } from '@/entities/movie/models/movie'

export async function getMovieById(id: number): Promise<IMovie | null> {
  return getMovieByIdRepository(id)
}
