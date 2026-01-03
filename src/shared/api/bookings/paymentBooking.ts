import { apiClient } from '../client'
import type { IDtoPaymentResponse } from './models/payment'

export async function paymentBooking(bookingId: string): Promise<IDtoPaymentResponse> {
  const result = await apiClient.post<IDtoPaymentResponse>(`/bookings/${bookingId}/payments`);
  return result.data
}
