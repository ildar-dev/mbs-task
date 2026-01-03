import type { ISeat } from '@/entities/theater/models/seat'
import { checkout as apiCheckout } from '@/shared/api/booking/checkout'
import { toDtoCheckout } from '../mappers/toDto'

// Заглушка оформления брони. Здесь должен быть вызов API:
export async function checkout(sessionId: number, seats: ISeat[]): Promise<void> {
  await apiCheckout(sessionId, toDtoCheckout(seats));
}
