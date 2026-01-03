import type { ITheater } from '@/entities/theater/models/theater'
import type { ISeat } from '@/entities/theater/models/seat'
import type { IMovie } from '@/entities/movie/models/movie'
import type { ICinema } from '@/entities/cinema/models/cinema'

export interface ISessionDetails {
  id: number;
  movieId: IMovie['id'];
  cinemaId: ICinema['id'];
  startTime: Date;
  theater: ITheater;
  bookedSeats: ISeat[];
}
