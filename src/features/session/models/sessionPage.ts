import type { ISessionDetails } from '@/entities/session/models/sessionDetails'
import type { ICinema } from '@/entities/cinema/models/cinema'
import type { IMovie } from '@/entities/movie/models/movie'

export interface ISessionPage {
  session: ISessionDetails;
  cinema: ICinema;
  movie: IMovie;
}
