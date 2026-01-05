import { getMovies } from '@/shared/api/movies/getMovies'
import { getSessionsByCinema } from '@/shared/api/sessions/sessionsByCinema'
import { mapDtoToMovie } from '@/entities/movie/mappers/fromDto'
import { mapDtoToSession } from '@/entities/session/mappers/fromDto'
import { groupedSortedSessionsByDateMovie } from './getGroupedSortedSessions'
import type { TMovieDictionary } from '../models/movieDictionary'
import type { TSessionsMatrixByDateMovie } from '../models/sessionsMatrixByDateMovie'

export async function getCalendarByMoviesForCinema(cinemaId: number): Promise<{
  moviesById: TMovieDictionary,
  matrix: TSessionsMatrixByDateMovie,
}> {
  const [moviesDto, sessionsDto] = await Promise.all([
    getMovies(),
    getSessionsByCinema(cinemaId),
  ]).catch(e => {
    console.error(e)
    return [[], []]
  })
  const movies = moviesDto.map(mapDtoToMovie)
  const moviesById = Object.fromEntries(movies.map(m => [m.id, m])) as TMovieDictionary
  const sessions = sessionsDto.map(mapDtoToSession)
  const matrix = groupedSortedSessionsByDateMovie(sessions, moviesById)
  return { moviesById, matrix }
}
