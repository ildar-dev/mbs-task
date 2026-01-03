import type { IDtoBooking } from '@/shared/api/bookings/models/bookings';
import type { IBooking } from '../models/booking';
import { EBookingStatus } from '../models/booking';

export function fromDto(dto: IDtoBooking): IBooking {
  return {
    id: dto.id,
    userId: dto.userId,
    movieSessionId: dto.movieSessionId,
    sessionId: dto.sessionId,
    bookedAt: new Date(dto.bookedAt),
    seats: dto.seats,
    status: dto.isPaid ? EBookingStatus.PAID : EBookingStatus.PENDING,
  }
}
