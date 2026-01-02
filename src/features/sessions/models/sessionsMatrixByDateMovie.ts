import type { ISession } from '@/entities/session/models/session'
import type { IMovie } from '@/entities/movie/models/movie'

export type TSessionsMatrixByDateMovie = Record<number, Record<IMovie['id'], ISession[]>>
