import type { ISettings } from '../models/settings'
import type { IDtoSettings } from '@/shared/api/settings/models/settings'
import { MS_IN_SECOND } from '@/utils/time/consts'

export function fromDto(dto: IDtoSettings): ISettings {
  return {
    bookingPaymentTimeMs: dto.bookingPaymentTimeSeconds * MS_IN_SECOND,
  }
}
