import type { IMovie } from '@/entities/movie/models/movie'

export type TMovieDictionary = Record<IMovie['id'], IMovie>
