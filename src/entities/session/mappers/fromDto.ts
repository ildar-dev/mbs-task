import type { ISession } from '../models/session'
import type { ISessionDetails } from '../models/sessionDetails'
import type { IDtoSession } from '@/shared/api/sessions/models'
import type { IDtoSessionDetails } from '@/shared/api/session/models'

export function mapDtoToSession(dto: IDtoSession): ISession {
  return {
    id: dto.id,
    movieId: dto.movieId,
    cinemaId: dto.cinemaId,
    startTime: new Date(dto.startTime),
  }
}

export function mapDtoToSessionDetails(dto: IDtoSessionDetails): ISessionDetails {
  return {
    id: dto.id,
    movieId: dto.movieId,
    cinemaId: dto.cinemaId,
    startTime: new Date(dto.startTime),
    theater: {
      size: {
        rows: dto.seats.rows,
        seatsPerRow: dto.seats.seatsPerRow,
      },
    },
    bookedSeats: dto.bookedSeats,
  }
}
