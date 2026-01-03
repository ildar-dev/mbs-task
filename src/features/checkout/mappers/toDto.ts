import type { IDtoCheckoutRequest } from '@/shared/api/checkout/models/checkout'
import type { ISeat } from '@/entities/theater/models/seat'

export function toDtoCheckout(seats: ISeat[]): IDtoCheckoutRequest {
  return {
    seats
  };
}
