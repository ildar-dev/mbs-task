import { getCinemas } from '@/shared/api/cinemas/getCinemas'
import { getSessionsByMovie } from '@/shared/api/sessions/sessionsByMovie'
import { mapDtoToSession } from '@/entities/session/mappers/fromDto'
import { groupedSortedSessionsByDateCinema } from './getGroupedSortedSessions'
import type { TCinemaDictionary } from '../models/cinemaDictionary'
import type { TSessionsMatrixByDateCinema } from '../models/sessionsMatrixByDateCinema'

export async function getCalendarByCinemasForMovie(movieId: number): Promise<{
  cinemasById: TCinemaDictionary,
  matrix: TSessionsMatrixByDateCinema,
}> {
    const [cinemas, sessionsDto] = await Promise.all([
      getCinemas(),
      getSessionsByMovie(movieId),
    ]).catch(e => {
      console.error(e)
      return [[], []]
    })
    const cinemasById = Object.fromEntries(cinemas.map(c => [c.id, c])) as TCinemaDictionary
    const sessions = sessionsDto.map(mapDtoToSession)
    const matrix = groupedSortedSessionsByDateCinema(sessions, cinemasById)
    return { cinemasById, matrix }
}
