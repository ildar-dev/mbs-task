import type { IDtoSeat } from '../../session/models';

export interface IDtoCheckoutRequest {
  seats: IDtoSeat[];
}

export interface IDtoCheckoutResponse {
  bookingId: string;
}
