import type { IBooking } from '@/entities/booking/models/booking';

export enum EGroupedBookingType {
  UNPAID = 'unpaid',
  CURRENT = 'current',
  PAST = 'past',
}

export interface IGroupedBookings {
  type: EGroupedBookingType;
  bookings: IBooking[];
}
