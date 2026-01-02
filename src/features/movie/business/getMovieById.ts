import { getMovies as apiGetMovies } from '@/shared/api/movies/getMovies'
import { mapDtoToMovie } from '@/entities/movie/mappers/fromDto'
import type { IMovie } from '@/entities/movie/models/movie'

export async function getMovieById(id: number): Promise<IMovie | null> {
  return (await apiGetMovies()).map(mapDtoToMovie).find(m => m.id === id) || null; // TODO: throw error if not found
}
