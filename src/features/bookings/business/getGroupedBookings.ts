import { EBookingStatus, type IBooking } from '@/entities/booking/models/booking';

import type { ISessionAggregate } from '@/entities/session/models/sessionAggregate'
import type { ISessionDetails } from '@/entities/session/models/sessionDetails'

import { EGroupedBookingType, type IGroupedBookings } from '../models/groupedBookings';

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

  const getSortTime = (b: IBooking) => sessionsById?.[b.sessionId]?.session.startTime.getTime() ?? 0

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

  // Сортируем внутри группы по времени начала сеанса (ближайшие сверху)
  const sortByStartTimeAsc = (a: IBooking, b: IBooking) => getSortTime(a) - getSortTime(b)
  // Сортируем внутри группы по времени бронирования (недавние сверху)
  const sortByBookedAtDesc = (a: IBooking, b: IBooking) => b.bookedAt.getTime() - a.bookedAt.getTime()

  return [
    { type: EGroupedBookingType.UNPAID, bookings: groups[EGroupedBookingType.UNPAID].sort(sortByBookedAtDesc) },
    { type: EGroupedBookingType.CURRENT, bookings: groups[EGroupedBookingType.CURRENT].sort(sortByStartTimeAsc) },
    { type: EGroupedBookingType.PAST, bookings: groups[EGroupedBookingType.PAST].sort(sortByStartTimeAsc) },
  ];
}

function sessionIsPast(session: ISessionDetails): boolean {
  const now = new Date();
  return session.startTime < now;
}
