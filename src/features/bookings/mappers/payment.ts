import type { IDtoPaymentResponse } from '@/shared/api/bookings/models/payment'
import type { IPaymentDetails } from '../models/payment'
import { EPaymentStatus } from '../models/payment'

export function fromDto(dto: IDtoPaymentResponse): IPaymentDetails {
  return {
    message: dto.message,
    status: mapStatus(dto.message),
  }
}

function mapStatus(message: string): EPaymentStatus {
  return (message.includes('успешно оплачено') || message.includes('уже оплачено'))
  ? EPaymentStatus.SUCCESS
  : EPaymentStatus.FAILED;
}
