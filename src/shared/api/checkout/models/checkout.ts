import type { IDtoSeat } from '@/shared/api/session/models';

export interface IDtoCheckoutRequest {
  seats: IDtoSeat[];
}

export interface IDtoCheckoutResponse {
  bookingId: string;
}
