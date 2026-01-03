import { getMovies as apiGetMovies } from '@/shared/api/movies/getMovies'
import { mapDtoToMovie } from '../mappers/fromDto'
import type { IMovie } from '../models/movie'

export async function getMovie(id: number): Promise<IMovie | null> {
  const movies = (await apiGetMovies()).map(mapDtoToMovie)
  return movies.find(m => m.id === id) ?? null
}

