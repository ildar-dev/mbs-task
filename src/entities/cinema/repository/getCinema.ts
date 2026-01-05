import { getCinemas as apiGetCinemas } from '@/shared/api/cinemas/getCinemas'
import type { ICinema } from '@/entities/cinema/models/cinema'
import { createDictionaryCache } from '@/shared/cache/dictionaryCache'

const cinemaCache = createDictionaryCache<ICinema, number>({
  loader: async () => (await apiGetCinemas()) as ICinema[],
  selectKey: (c: ICinema) => c.id,
})

export function getCinemaById(id: number): Promise<ICinema | null> {
  return cinemaCache.getByKey(id)
}

export function getCinemasCached(): Promise<ICinema[]> {
  return cinemaCache.getAll()
}
