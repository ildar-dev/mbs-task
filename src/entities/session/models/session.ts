import type { IMovie } from '@/entities/movie/models/movie'
import type { ICinema } from '@/entities/cinema/models/cinema'

export interface ISession {
  id: number;
  movieId: IMovie['id'];
  cinemaId: ICinema['id'];
  startTime: Date;
}
