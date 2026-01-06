import { IInterceptorResponse } from './model'

import { useAuthStore } from '@/features/auth'
import { router } from '@/router'
import { goToLogin } from '@/shared/router/redirect'

export const unauthorizedInterceptor: IInterceptorResponse = {
  onFulfilled: response => response,
  onRejected: error => {
    const status = error?.response?.status
    if (status === 401) {
      const store = useAuthStore()
      store.logout()
      goToLogin(router)
    }
    return Promise.reject(error)
  }
}
