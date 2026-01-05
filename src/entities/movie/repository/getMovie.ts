import { getMovies as apiGetMovies } from '@/shared/api/movies/getMovies'
import { mapDtoToMovie } from '../mappers/fromDto'
import type { IMovie } from '../models/movie'
import { createDictionaryCache } from '@/shared/cache/dictionaryCache'

const movieCache = createDictionaryCache<IMovie, number>({
  loader: async () => (await apiGetMovies()).map(mapDtoToMovie),
  selectKey: (m) => m.id,
})

export function getMovieById(id: number): Promise<IMovie | null> {
  return movieCache.getByKey(id)
}

export function getMoviesCached(): Promise<IMovie[]> {
  return movieCache.getAll()
}
