import type { ISession } from '../models/session'
import type { IDtoSession } from '@/shared/api/sessions/models'

export function mapDtoToSession(dto: IDtoSession): ISession {
  return {
    id: dto.id,
    movieId: dto.movieId,
    cinemaId: dto.cinemaId,
    startTime: new Date(dto.startTime),
  }
}
