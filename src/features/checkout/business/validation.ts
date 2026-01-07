import type { ISeat } from '@/entities/theater/models/seat'
import type { ITheater } from '@/entities/theater/models/theater'

export function validateSeatsSelection(seats: ISeat[], theater: ITheater, bookedSeats: ISeat[]): void {
  if (!Array.isArray(seats) || seats.length === 0) {
    throw new Error('Выберите хотя бы одно место')
  }

  const { rows, seatsPerRow } = theater.size;

  // Проверяем, что не выбраны идентичные места для бронирования
  const seatSet = new Set<string>();
  for (const seat of seats) {
    const key = `${seat.rowNumber}-${seat.seatNumber}`;
    if (seatSet.has(key)) {
      throw new Error('Нельзя выбрать одинаковые места для бронирования');
    }
    seatSet.add(key);
  }

  // [1..rows], [1..seatsPerRow]
  if (seats.some(seat => seat.rowNumber < 1 || seat.seatNumber < 1)) {
    throw new Error('Неверные места')
  }
  if (seats.some(seat => seat.rowNumber > rows || seat.seatNumber > seatsPerRow)) {
    throw new Error('Неверные места')
  }
}
