import type { IDtoCheckoutRequest } from '@/shared/api/booking/models/checkouts'
import type { ISeat } from '@/entities/theater/models/seat'

export function toDtoCheckout(seats: ISeat[]): IDtoCheckoutRequest {
  return {
    seats
  };
}
