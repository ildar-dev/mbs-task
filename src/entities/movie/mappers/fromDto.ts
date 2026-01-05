import type { IMovie } from '../models/movie'
import type { IDtoMovie } from '@/shared/api/movies/models'
import { getImageUrl } from '@/shared/api/image/getImageUrl'
import { minutesToMs } from '@/utils/time/converter'

export function mapDtoToMovie(dto: IDtoMovie): IMovie {
  return {
    id: dto.id,
    title: dto.title,
    year: dto.year,
    rating: dto.rating,
    posterUrl: getImageUrl(dto.posterImage),
    lengthInMs: minutesToMs(dto.lengthMinutes),
    description: dto.description,
  }
}
