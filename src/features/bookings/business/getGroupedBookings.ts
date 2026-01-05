import type { IBooking } from '@/entities/booking/models/booking';
import { EBookingStatus } from '@/entities/booking/models/booking';

import type { ISessionAggregate } from '@/entities/session/models/sessionAggregate'
import type { ISessionDetails } from '@/entities/session/models/sessionDetails'

import type { IGroupedBookings } from '../models/groupedBookings';
import { EGroupedBookingType } from '../models/groupedBookings';

export function getGroupedBookings(
  bookings: IBooking[],
  sessionsById?: Record<number, ISessionAggregate>,
): IGroupedBookings[] {
  const now = new Date();
  const groups: Record<EGroupedBookingType, IBooking[]> = {
    [EGroupedBookingType.UNPAID]: [],
    [EGroupedBookingType.CURRENT]: [],
    [EGroupedBookingType.PAST]: [],
  };

  for (const booking of bookings) {
    let type: EGroupedBookingType;
    if (booking.status === EBookingStatus.UNPAID) {
      type = EGroupedBookingType.UNPAID;
    } else {
      const session = sessionsById?.[booking.sessionId].session!;
      const isPast = sessionIsPast(session);
      type = isPast ? EGroupedBookingType.PAST : EGroupedBookingType.CURRENT;
    }
    groups[type].push(booking);
  }

  return [
    { type: EGroupedBookingType.UNPAID, bookings: groups[EGroupedBookingType.UNPAID] },
    { type: EGroupedBookingType.CURRENT, bookings: groups[EGroupedBookingType.CURRENT] },
    { type: EGroupedBookingType.PAST, bookings: groups[EGroupedBookingType.PAST] },
  ];
}

function sessionIsPast(session: ISessionDetails): boolean {
  const now = new Date();
  return session.startTime < now;
}
