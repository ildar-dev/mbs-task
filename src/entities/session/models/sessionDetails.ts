import type { ITheater } from '@/entities/theater/models/theater'
import type { ISeat } from '@/entities/theater/models/seat'
import type { ISession } from './session'

export interface ISessionDetails extends ISession {
  theater: ITheater;
  bookedSeats: ISeat[];
}
