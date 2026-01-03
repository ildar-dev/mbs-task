import { EGroupedBookingType } from '../models/groupedBookings';

export function getGroupTitle(type: EGroupedBookingType): string {
  switch (type) {
    case EGroupedBookingType.UNPAID:
      return 'Неоплаченные';
    case EGroupedBookingType.CURRENT:
      return 'Будущие';
    case EGroupedBookingType.PAST:
      return 'Прошедшие';
  }
}
