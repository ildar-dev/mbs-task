import { paymentBooking as apiPaymentBooking } from '@/shared/api/bookings/paymentBooking'
import type { IPaymentDetails } from '../models/payment'
import { fromDto } from '../mappers/payment'

export async function paymentBooking(bookingId: string): Promise<IPaymentDetails> {
  return fromDto(await apiPaymentBooking(bookingId))
}
