import type { IInterceptorResponse } from './model'
import { normalizeError } from '../errors'

export const errorNormalizeInterceptor: IInterceptorResponse = {
  onFulfilled: (r) => r,
  onRejected: (err) => {
    return Promise.reject(normalizeError(err))
  },
}
