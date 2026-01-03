import { getSessionById as apiGetSessionById } from '@/shared/api/session/getSessionById'
import { mapDtoToSessionDetails } from '@/entities/session/mappers/fromDto'
import { getCinemaById } from '@/entities/cinema/repository/getCinema'
import { getMovieById } from '@/entities/movie/repository/getMovie'
import type { ISessionAggregate } from '@/entities/session/models/sessionAggregate'

export async function getSessionAggregateById(sessionId: number): Promise<ISessionAggregate> {
  const session = mapDtoToSessionDetails(await apiGetSessionById(sessionId))
  const cinema = (await getCinemaById(session.cinemaId))!
  const movie = (await getMovieById(session.movieId))!
  return { session, cinema, movie }
}
