import type { IBooking } from '@/entities/booking/models/booking';
import type { ISessionAggregate } from '@/entities/session/models/sessionAggregate';
import type { ISessionDetails } from '@/entities/session/models/sessionDetails';
import { EBookingStatus } from '@/entities/booking/models/booking';
import { baseSessions } from './sessions';
import { baseMoviesById } from './movies';
import { baseCinemasById } from './cinemas';

export function createBooking(overrides?: Partial<IBooking>): IBooking {
  return {
    id: 'booking-1',
    userId: 1,
    sessionId: 1,
    bookedAt: new Date('2024-05-01T10:00:00'),
    seats: [{ rowNumber: 1, seatNumber: 1 }],
    status: EBookingStatus.PAID,
    ...overrides,
  };
}

export function createSessionDetails(overrides?: Partial<ISessionDetails>): ISessionDetails {
  return {
    id: 1,
    movieId: 1,
    cinemaId: 1,
    startTime: new Date('2024-05-10T10:00:00'),
    theater: {
      size: {
        rows: 10,
        seatsPerRow: 15,
      },
    },
    bookedSeats: [],
    ...overrides,
  };
}

export function createSessionAggregate(
  session: ISessionDetails,
  overrides?: Partial<Omit<ISessionAggregate, 'session'>>
): ISessionAggregate {
  return {
    session,
    cinema: baseCinemasById[session.cinemaId] ?? baseCinemasById[10],
    movie: baseMoviesById[session.movieId] ?? baseMoviesById[1],
    ...overrides,
  };
}

export function createSessionsById(
  sessions: typeof baseSessions = baseSessions
): Record<number, ISessionAggregate> {
  const result: Record<number, ISessionAggregate> = {};
  for (const session of sessions) {
    const sessionDetails = createSessionDetails({
      id: session.id,
      movieId: session.movieId,
      cinemaId: session.cinemaId,
      startTime: session.startTime,
    });
    result[session.id] = createSessionAggregate(sessionDetails);
  }
  return result;
}

// ============================================================================
// Специфичные наборы данных для различных сценариев
// ============================================================================

/**
 * Фикстуры для тестов с пустыми данными
 */
export const fixturesEmptyBookings = {
  bookings: [] as IBooking[],
  sessionsById: {} as Record<number, ISessionAggregate>,
};
