import { IInterceptorResponseCallback } from './model'

import { useAuthStore } from '@/features/auth/models/store'
import { router } from '@/router'
import { goToLogin } from '@/shared/router/redirect'

export const unauthorizedInterceptor: IInterceptorResponseCallback = {
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
