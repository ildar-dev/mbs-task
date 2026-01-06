import { describe, it, expect } from 'vitest'
import { getGroupedBookings } from '../business/getGroupedBookings'
import { IBooking } from '@/entities/booking/models/booking'
import { ISessionAggregate } from '@/entities/session/models/sessionAggregate'

const bookings: IBooking[] = [
  {
    id: '1',
    userId: '1',
    sessionId: '1',
    seats: [],
    bookedAt: new Date(),
  },
]

describe('grouped bookings', () => {
  describe('getGroupedBookings', () => {
    it('должен возвращать true для валидного имени пользователя (>= 8 символов)', () => {
      expect(isValidUsername('username1')).toBe(true)
      expect(isValidUsername('verylongusername')).toBe(true)
      expect(isValidUsername('12345678')).toBe(true)
    })

    it('должен возвращать false для короткого имени (< 8 символов)', () => {
      expect(isValidUsername('user')).toBe(false)
      expect(isValidUsername('')).toBe(false)
      expect(isValidUsername('1234567')).toBe(false)
    })

    it('должен возвращать false для не-строк', () => {
      expect(isValidUsername(null as any)).toBe(false)
      expect(isValidUsername(undefined as any)).toBe(false)
      expect(isValidUsername(123 as any)).toBe(false)
    })
  })
})
