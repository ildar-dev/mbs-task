import { getMoviesCached } from '@/entities/movie/repository/getMovie'
import type { IMovie } from '@/entities/movie/models/movie'

export async function getMovies(): Promise<IMovie[]> {
  return await getMoviesCached()
}
