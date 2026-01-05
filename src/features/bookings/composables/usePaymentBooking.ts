import { ref } from 'vue'
import { paymentBooking } from '../business/payment'
import type { IPaymentDetails } from '../models/payment'
import { EPaymentStatus } from '../models/payment'
import type { IBooking } from '@/entities/booking/models/booking'
import { useSettingsStore } from '@/app/settings/models/store'
import { MS_IN_SECOND } from '@/utils/time/consts'

export function usePaymentBooking() {
  const isPaying = ref(false)
  const lastResult = ref<IPaymentDetails | null>(null)
  const error = ref<unknown>(null)
  const settingsStore = useSettingsStore()

  function assertNotExpired(booking: IBooking) {
    const seconds = settingsStore.settings?.bookingPaymentTimeSeconds ?? 0
    if (seconds <= 0) return
    const deadline = booking.bookedAt.getTime() + seconds * MS_IN_SECOND
    if (Date.now() > deadline) {
      throw new Error('Время на оплату истекло')
    }
  }

  async function pay(booking: IBooking): Promise<IPaymentDetails> {
    isPaying.value = true
    error.value = null
    try {
      assertNotExpired(booking)
      const result = await paymentBooking(booking.id)
      lastResult.value = result
      return result
    } catch (e) {
      error.value = e
      throw e
    } finally {
      isPaying.value = false
    }
  }

  return { isPaying, lastResult, error, pay, EPaymentStatus }
}
