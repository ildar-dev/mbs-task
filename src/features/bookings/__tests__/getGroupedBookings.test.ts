import { describe, it, expect } from 'vitest'
import { getGroupedBookings } from '../business/getGroupedBookings'
import { EGroupedBookingType } from '../models/groupedBookings'
import { EBookingStatus } from '@/entities/booking/models/booking'
import {
  createBooking,
  createSessionDetails,
  createSessionAggregate,
  fixturesEmptyBookings,
} from '@/shared/__tests__/fixtures/bookings'
import type { ISessionAggregate } from '@/entities/session/models/sessionAggregate'

const ONE_HOUR_IN_MS = 3600000
const ONE_DAY_IN_MS = 86400000

function futureDate(offsetMs: number = ONE_DAY_IN_MS): Date {
  return new Date(Date.now() + offsetMs)
}

function pastDate(offsetMs: number = ONE_DAY_IN_MS): Date {
  return new Date(Date.now() - offsetMs)
}

function createSessionsByIdFromDates(
  sessions: Array<{ id: number; startTime: Date }>
): Record<number, ISessionAggregate> {
  const result: Record<number, ISessionAggregate> = {}
  for (const { id, startTime } of sessions) {
    result[id] = createSessionAggregate(createSessionDetails({ id, startTime }))
  }
  return result
}

describe('getGroupedBookings', () => {
  describe('базовая функциональность', () => {
    it('группирует бронирования по типам', () => {
      const bookings = [
        createBooking({ id: 'unpaid-1', sessionId: 1, status: EBookingStatus.UNPAID }),
        createBooking({ id: 'paid-current-1', sessionId: 2, status: EBookingStatus.PAID }),
        createBooking({ id: 'paid-past-1', sessionId: 3, status: EBookingStatus.PAID }),
      ]

      const sessionsById = createSessionsByIdFromDates([
        { id: 1, startTime: futureDate() },
        { id: 2, startTime: futureDate() },
        { id: 3, startTime: pastDate() },
      ])

      const result = getGroupedBookings(bookings, sessionsById)

      expect(result).toHaveLength(3)
      expect(result[0].type).toBe(EGroupedBookingType.UNPAID)
      expect(result[1].type).toBe(EGroupedBookingType.CURRENT)
      expect(result[2].type).toBe(EGroupedBookingType.PAST)
    })

    it('возвращает все бронирования в результате', () => {
      const bookings = [
        createBooking({ id: '1', sessionId: 1, status: EBookingStatus.UNPAID }),
        createBooking({ id: '2', sessionId: 2, status: EBookingStatus.PAID }),
      ]

      const sessionsById = createSessionsByIdFromDates([
        { id: 1, startTime: futureDate() },
        { id: 2, startTime: futureDate() },
      ])

      const result = getGroupedBookings(bookings, sessionsById)

      const allBookings = result.flatMap(group => group.bookings)
      expect(allBookings.length).toBe(2)
      expect(allBookings.map(b => b.id).sort()).toEqual(['1', '2'].sort())
    })
  })

  describe('классификация бронирований', () => {
    it('классифицирует неоплаченные бронирования как UNPAID', () => {
      const bookings = [createBooking({ id: 'unpaid-1', sessionId: 1, status: EBookingStatus.UNPAID })]
      const sessionsById = createSessionsByIdFromDates([{ id: 1, startTime: new Date() }])

      const result = getGroupedBookings(bookings, sessionsById)

      const unpaidGroup = result.find(g => g.type === EGroupedBookingType.UNPAID)
      expect(unpaidGroup).toBeDefined()
      expect(unpaidGroup?.bookings).toHaveLength(1)
      expect(unpaidGroup?.bookings[0].id).toBe('unpaid-1')
    })

    it('классифицирует оплаченные будущие сеансы как CURRENT', () => {
      const bookings = [createBooking({ id: 'current-1', sessionId: 1, status: EBookingStatus.PAID })]
      const sessionsById = createSessionsByIdFromDates([{ id: 1, startTime: futureDate() }])

      const result = getGroupedBookings(bookings, sessionsById)

      const currentGroup = result.find(g => g.type === EGroupedBookingType.CURRENT)
      expect(currentGroup).toBeDefined()
      expect(currentGroup?.bookings).toHaveLength(1)
      expect(currentGroup?.bookings[0].id).toBe('current-1')
    })

    it('классифицирует оплаченные прошедшие сеансы как PAST', () => {
      const bookings = [createBooking({ id: 'past-1', sessionId: 1, status: EBookingStatus.PAID })]
      const sessionsById = createSessionsByIdFromDates([{ id: 1, startTime: pastDate() }])

      const result = getGroupedBookings(bookings, sessionsById)

      const pastGroup = result.find(g => g.type === EGroupedBookingType.PAST)
      expect(pastGroup).toBeDefined()
      expect(pastGroup?.bookings).toHaveLength(1)
      expect(pastGroup?.bookings[0].id).toBe('past-1')
    })
  })

  describe('сортировка', () => {
    it('сортирует UNPAID по времени бронирования (недавние сверху)', () => {
      const bookings = [
        createBooking({ id: 'early', sessionId: 1, bookedAt: new Date('2024-05-01T10:00:00'), status: EBookingStatus.UNPAID }),
        createBooking({ id: 'late', sessionId: 2, bookedAt: new Date('2024-05-02T11:00:00'), status: EBookingStatus.UNPAID }),
        createBooking({ id: 'middle', sessionId: 3, bookedAt: new Date('2024-05-01T15:00:00'), status: EBookingStatus.UNPAID }),
      ]

      const sessionsById = createSessionsByIdFromDates([
        { id: 1, startTime: new Date() },
        { id: 2, startTime: new Date() },
        { id: 3, startTime: new Date() },
      ])

      const result = getGroupedBookings(bookings, sessionsById)

      const unpaidGroup = result.find(g => g.type === EGroupedBookingType.UNPAID)
      expect(unpaidGroup?.bookings.map(b => b.id)).toEqual(['late', 'middle', 'early'])
    })

    it('сортирует CURRENT по времени начала сеанса (ближайшие сверху)', () => {
      const bookings = [
        createBooking({ id: 'far', sessionId: 3, status: EBookingStatus.PAID }),
        createBooking({ id: 'near', sessionId: 1, status: EBookingStatus.PAID }),
        createBooking({ id: 'middle', sessionId: 2, status: EBookingStatus.PAID }),
      ]

      const sessionsById = createSessionsByIdFromDates([
        { id: 1, startTime: futureDate(ONE_HOUR_IN_MS) },
        { id: 2, startTime: futureDate(ONE_HOUR_IN_MS * 2) },
        { id: 3, startTime: futureDate(ONE_HOUR_IN_MS * 3) },
      ])

      const result = getGroupedBookings(bookings, sessionsById)

      const currentGroup = result.find(g => g.type === EGroupedBookingType.CURRENT)
      expect(currentGroup?.bookings.map(b => b.id)).toEqual(['near', 'middle', 'far'])
    })

    it('сортирует PAST по времени начала сеанса (по возрастанию)', () => {
      const bookings = [
        createBooking({ id: 'old', sessionId: 3, status: EBookingStatus.PAID }),
        createBooking({ id: 'recent', sessionId: 1, status: EBookingStatus.PAID }),
        createBooking({ id: 'middle', sessionId: 2, status: EBookingStatus.PAID }),
      ]

      const sessionsById = createSessionsByIdFromDates([
        { id: 1, startTime: pastDate(ONE_HOUR_IN_MS) },
        { id: 2, startTime: pastDate(ONE_HOUR_IN_MS * 2) },
        { id: 3, startTime: pastDate(ONE_HOUR_IN_MS * 3) },
      ])

      const result = getGroupedBookings(bookings, sessionsById)

      const pastGroup = result.find(g => g.type === EGroupedBookingType.PAST)
      // Сортировка по возрастанию времени начала (старые сначала)
      expect(pastGroup?.bookings.map(b => b.id)).toEqual(['old', 'middle', 'recent'])
    })
  })

  describe('обработка входных данных', () => {
    it('обрабатывает пустой массив бронирований', () => {
      const result = getGroupedBookings(fixturesEmptyBookings.bookings, fixturesEmptyBookings.sessionsById)

      expect(result).toHaveLength(3)
      expect(result[0].bookings).toHaveLength(0)
      expect(result[1].bookings).toHaveLength(0)
      expect(result[2].bookings).toHaveLength(0)
    })

    it('корректно обрабатывает бронирования без sessionsById', () => {
      const bookings = [
        createBooking({
          id: 'unpaid-1',
          sessionId: 1,
          status: EBookingStatus.UNPAID,
        }),
      ]

      const result = getGroupedBookings(bookings)

      expect(result).toHaveLength(3)
      const unpaidGroup = result.find(g => g.type === EGroupedBookingType.UNPAID)
      expect(unpaidGroup?.bookings).toHaveLength(1)
    })

    it('корректно обрабатывает бронирования с отсутствующими сеансами в sessionsById', () => {
      const bookings = [
        createBooking({ id: 'unpaid-1', sessionId: 999, status: EBookingStatus.UNPAID }), // Несуществующий сеанс
        createBooking({ id: 'paid-1', sessionId: 1, status: EBookingStatus.PAID }),
      ]

      const sessionsById = createSessionsByIdFromDates([{ id: 1, startTime: new Date() }])

      const result = getGroupedBookings(bookings, sessionsById)

      // UNPAID должен быть в группе UNPAID независимо от наличия сеанса
      const unpaidGroup = result.find(g => g.type === EGroupedBookingType.UNPAID)
      expect(unpaidGroup?.bookings.some(b => b.id === 'unpaid-1')).toBe(true)
    })
  })

  describe('комплексные сценарии', () => {
    it('корректно группирует и сортирует смешанные бронирования', () => {
      const bookings = [
        createBooking({ id: 'unpaid-late', sessionId: 1, bookedAt: new Date('2024-05-02T11:00:00'), status: EBookingStatus.UNPAID }),
        createBooking({ id: 'unpaid-early', sessionId: 2, bookedAt: new Date('2024-05-01T10:00:00'), status: EBookingStatus.UNPAID }),
        createBooking({ id: 'current-far', sessionId: 4, status: EBookingStatus.PAID }),
        createBooking({ id: 'current-near', sessionId: 3, status: EBookingStatus.PAID }),
        createBooking({ id: 'past-old', sessionId: 6, status: EBookingStatus.PAID }),
        createBooking({ id: 'past-recent', sessionId: 5, status: EBookingStatus.PAID }),
      ]

      const sessionsById = createSessionsByIdFromDates([
        { id: 1, startTime: futureDate() },
        { id: 2, startTime: futureDate() },
        { id: 3, startTime: futureDate(ONE_HOUR_IN_MS) },
        { id: 4, startTime: futureDate(ONE_HOUR_IN_MS * 2) },
        { id: 5, startTime: pastDate(ONE_HOUR_IN_MS) },
        { id: 6, startTime: pastDate(ONE_HOUR_IN_MS * 2) },
      ])

      const result = getGroupedBookings(bookings, sessionsById)

      // Проверяем порядок групп
      expect(result[0].type).toBe(EGroupedBookingType.UNPAID)
      expect(result[1].type).toBe(EGroupedBookingType.CURRENT)
      expect(result[2].type).toBe(EGroupedBookingType.PAST)

      // Проверяем сортировку UNPAID (по bookedAt desc)
      expect(result[0].bookings.map(b => b.id)).toEqual(['unpaid-late', 'unpaid-early'])

      // Проверяем сортировку CURRENT (по startTime asc)
      expect(result[1].bookings.map(b => b.id)).toEqual(['current-near', 'current-far'])

      // Проверяем сортировку PAST (по startTime asc - старые сначала)
      expect(result[2].bookings.map(b => b.id)).toEqual(['past-old', 'past-recent'])
    })
  })
})
