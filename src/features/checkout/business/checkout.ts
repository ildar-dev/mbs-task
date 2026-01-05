import type { ISeat } from '@/entities/theater/models/seat'
import { checkout as apiCheckout } from '@/shared/api/checkout/checkout'
import { toDtoCheckout } from '../mappers/toDto'

export async function checkout(sessionId: number, seats: ISeat[]): Promise<void> {
  await apiCheckout(sessionId, toDtoCheckout(seats));
}
