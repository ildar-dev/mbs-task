import { IInterceptorResponse } from './model'

import { useAuthStore } from '@/features/auth/models/store'
import { LOGIN_PAGE } from '@/shared/router/models/routes'

export const unauthorizedInterceptor: IInterceptorResponse = {
  onFulfilled: response => response,
  onRejected: error => {
    const status = error?.response?.status
    if (status === 401) {
      const store = useAuthStore()
      store.logout()
      window.location.href = LOGIN_PAGE
    }
    return Promise.reject(error)
  }
}
