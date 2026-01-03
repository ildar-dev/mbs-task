import { ref } from 'vue'
import { paymentBooking } from '../business/payment'
import type { IPaymentDetails } from '../models/payment'
import { EPaymentStatus } from '../models/payment'

export function usePaymentBooking() {
  const isPaying = ref(false)
  const lastResult = ref<IPaymentDetails | null>(null)
  const error = ref<unknown>(null)

  async function pay(bookingId: string): Promise<IPaymentDetails> {
    isPaying.value = true
    error.value = null
    try {
      const result = await paymentBooking(bookingId)
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

