import type { ISession } from '@/entities/session/models/session'
import type { TSessionsMatrixByDateCinema } from '../models/sessionsMatrixByDateCinema'
import type { TSessionsMatrixByDateMovie } from '../models/sessionsMatrixByDateMovie'

function startOfDayTs(date: Date): number {
  const d = new Date(date)
  d.setHours(0, 0, 0, 0)
  return d.getTime()
}

export function groupedSessionsByDateCinema(sessions: ISession[]): TSessionsMatrixByDateCinema {
  const result: TSessionsMatrixByDateCinema = {}
  for (const s of sessions) {
    const day = startOfDayTs(s.startTime)
    result[day] ??= {}
    result[day][s.cinemaId] ??= []
    result[day][s.cinemaId].push(s)
  }
  return result
}

export function groupedSessionsByDateMovie(sessions: ISession[]): TSessionsMatrixByDateMovie {
  const result: TSessionsMatrixByDateMovie = {}
  for (const s of sessions) {
    const day = startOfDayTs(s.startTime)
    result[day] ??= {}
    result[day][s.movieId] ??= []
    result[day][s.movieId].push(s)
  }
  return result
}
