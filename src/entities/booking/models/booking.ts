import type { ISeat } from '@/entities/theater/models/seat';

export enum EBookingStatus {
  PENDING = 'pending',
  PAID = 'paid',
}

export interface IBooking {
  id: string;
  userId: number;
  movieSessionId: number;
  sessionId: number;
  bookedAt: Date;
  seats: ISeat[];
  status: EBookingStatus;
}
