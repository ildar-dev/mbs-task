import type { ISeat } from '@/entities/theater/models/seat';
import type { ISession } from '@/entities/session/models/session';

export enum EBookingStatus {
  UNPAID = 'unpaid',
  PAID = 'paid',
}

export interface IBooking {
  id: string;
  userId: number;
  sessionId: ISession['id'];
  bookedAt: Date;
  seats: ISeat[];
  status: EBookingStatus;
}
