import type { ISessionDetails } from './sessionDetails'
import type { ICinema } from '@/entities/cinema/models/cinema'
import type { IMovie } from '@/entities/movie/models/movie'

export interface ISessionAggregate {
  session: ISessionDetails
  cinema: ICinema
  movie: IMovie
}
