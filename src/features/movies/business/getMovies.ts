import { getMovies as apiGetMovies } from '@/shared/api/movies/getMovies'
import { mapDtoToMovie } from '../mappers/movies';
import { IMovie } from '../models/movie';

export async function getMovies(): Promise<IMovie[]> {
  return (await apiGetMovies()).map(mapDtoToMovie);
}
