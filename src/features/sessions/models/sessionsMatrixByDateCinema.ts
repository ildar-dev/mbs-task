import type { ISession } from '@/entities/session/models/session'
import type { ICinema } from '@/entities/cinema/models/cinema'

export type TSessionsMatrixByDateCinema = Record<number, Record<ICinema['id'], ISession[]>>
