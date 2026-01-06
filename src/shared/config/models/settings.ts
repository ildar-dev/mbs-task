import { MS_IN_SECOND } from '@/utils/time/consts'

export interface ISettings {
  bookingPaymentTimeMs: number
}

export const defaultSettings: ISettings = {
  bookingPaymentTimeMs: 180 * MS_IN_SECOND,
}
