import type { ISession } from '@/entities/session/models/session'
import { groupedSessionsByDateCinema, groupedSessionsByDateMovie, startOfDayTs } from './getGroupedSessions'
import type { TSessionsMatrixByDateCinema } from '../models/sessionsMatrixByDateCinema'
import type { TSessionsMatrixByDateMovie } from '../models/sessionsMatrixByDateMovie'
import type { TCinemaDictionary } from '../models/cinemaDictionary'
import type { TMovieDictionary } from '../models/movieDictionary'

function compareCinemaIdsByName(cinemasById: TCinemaDictionary) {
  return (a: number, b: number): number => {
    const an = cinemasById[a]?.name ?? ''
    const bn = cinemasById[b]?.name ?? ''
    return an.localeCompare(bn) || a - b
  }
}

function compareMovieIdsByTitle(moviesById: TMovieDictionary) {
  return (a: number, b: number): number => {
    const an = moviesById[a]?.title ?? ''
    const bn = moviesById[b]?.title ?? ''
    return an.localeCompare(bn) || a - b
  }
}

// TODO добавить тест с разного рода сортировками сессий на входе и ожиданием правильного порядка в результате

export function groupedSortedSessionsByDateCinema(
  sessions: ISession[],
  cinemasById: TCinemaDictionary,
): TSessionsMatrixByDateCinema {
  // сортируем сессии по времени, затем группируем
  const sorted = [...sessions].sort((a, b) => a.startTime.getTime() - b.startTime.getTime())
  const raw = groupedSessionsByDateCinema(sorted)
  // сортируем дни и внутренние ключи по названию кинотеатров (fallback по id)
  const result: TSessionsMatrixByDateCinema = {}
  const dayKeys = Object.keys(raw).map(Number).sort((a, b) => a - b)
  for (const day of dayKeys) {
    const inner = raw[day] ?? {}
    const ids = Object.keys(inner).map(Number).sort(compareCinemaIdsByName(cinemasById))
    const orderedInner: Record<number, typeof inner[number]> = {}
    for (const id of ids) orderedInner[id] = inner[id]
    result[day] = orderedInner
  }
  return result
}

export function groupedSortedSessionsByDateMovie(
  sessions: ISession[],
  moviesById: TMovieDictionary,
): TSessionsMatrixByDateMovie {
  // сортируем сессии по времени, затем группируем
  const sorted = [...sessions].sort((a, b) => a.startTime.getTime() - b.startTime.getTime())
  const raw = groupedSessionsByDateMovie(sorted)
  // сортируем дни и внутренние ключи по названию фильмов (fallback по id)
  const result: TSessionsMatrixByDateMovie = {}
  const dayKeys = Object.keys(raw).map(Number).sort((a, b) => a - b)
  for (const day of dayKeys) {
    const inner = raw[day] ?? {}
    const ids = Object.keys(inner).map(Number).sort(compareMovieIdsByTitle(moviesById))
    const orderedInner: Record<number, typeof inner[number]> = {}
    for (const id of ids) orderedInner[id] = inner[id]
    result[day] = orderedInner
  }
  return result
}

