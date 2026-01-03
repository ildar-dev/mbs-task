import { getSessionById } from './getSessionById'
import { getCinemaById as getCinemaByIdRepository } from '@/entities/cinema/repository/getCinema'
import { getMovieById as getMovieByIdRepository } from '@/entities/movie/repository/getMovie'
import type { ISessionPage } from '../models/sessionPage'

export async function getSessionPageById(sessionId: number): Promise<ISessionPage> {
  const session = await getSessionById(sessionId)
  const cinema = (await getCinemaByIdRepository(session.cinemaId))! // TODO обработка ошибки
  const movie = (await getMovieByIdRepository(session.movieId))!
  return {
    session,
    cinema,
    movie,
  }
}
