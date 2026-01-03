import type { ISession } from '@/entities/session/models/session'
import type { TSessionsMatrixByDateCinema } from '../models/sessionsMatrixByDateCinema'
import type { TSessionsMatrixByDateMovie } from '../models/sessionsMatrixByDateMovie'
// ВНИМАНИЕ: здесь только группировка, без сортировки.
// Сортирующие варианты находятся в getGroupedSortedSessions.ts

export function startOfDayTs(date: Date): number {
  const d = new Date(date)
  d.setHours(0, 0, 0, 0)
  return d.getTime()
}

export function groupedSessionsByDateCinema(
  sessions: ISession[],
): TSessionsMatrixByDateCinema {
  const raw: TSessionsMatrixByDateCinema = {}
  for (const s of sessions) {
    const day = startOfDayTs(s.startTime)
    raw[day] ??= {}
    raw[day][s.cinemaId] ??= []
    raw[day][s.cinemaId].push(s)
  }
  return raw
}

export function groupedSessionsByDateMovie(
  sessions: ISession[],
): TSessionsMatrixByDateMovie {
  const raw: TSessionsMatrixByDateMovie = {}
  for (const s of sessions) {
    const day = startOfDayTs(s.startTime)
    raw[day] ??= {}
    raw[day][s.movieId] ??= []
    raw[day][s.movieId].push(s)
  }
  return raw
}
