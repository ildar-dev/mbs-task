import type { IBooking } from '@/entities/booking/models/booking';
import { EBookingStatus } from '@/entities/booking/models/booking';
import type { IGroupedBookings } from '../models/groupedBookings';
import { EGroupedBookingType } from '../models/groupedBookings';

export function getGroupedBookings(bookings: IBooking[]): IGroupedBookings[] {
  const now = new Date();
  const groups: Record<EGroupedBookingType, IBooking[]> = {
    [EGroupedBookingType.UNPAID]: [],
    [EGroupedBookingType.CURRENT]: [],
    [EGroupedBookingType.PAST]: [],
  };

  for (const booking of bookings) {
    const type =
      booking.status === EBookingStatus.UNPAID
        ? EGroupedBookingType.UNPAID
        : booking.bookedAt < now // TODO split by session datetime
        ? EGroupedBookingType.PAST
        : EGroupedBookingType.CURRENT;
    groups[type].push(booking);
  }

  return [
    { type: EGroupedBookingType.UNPAID, bookings: groups[EGroupedBookingType.UNPAID] },
    { type: EGroupedBookingType.CURRENT, bookings: groups[EGroupedBookingType.CURRENT] },
    { type: EGroupedBookingType.PAST, bookings: groups[EGroupedBookingType.PAST] },
  ];
}
