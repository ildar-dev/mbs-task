import type { IMovie } from '../models/movie'

export function moviesById(movies: IMovie[]): Record<IMovie['id'], IMovie> {
  return Object.fromEntries(movies.map(m => [m.id, m]))
}