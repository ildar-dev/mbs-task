import { IInterceptorResponseCallback } from './model'

import { useAuthStore } from '@/features/auth/models/store'
import { router } from '@/router'

export const unauthorizedInterceptor: IInterceptorResponseCallback = {
  onFulfilled: response => response,
  onRejected: error => {
    const status = error?.response?.status
    if (status === 401) {
      const store = useAuthStore()
      store.logout()
      const current = router.currentRoute.value
      const returnTo = current?.fullPath ?? '/'
      if (current?.path !== '/login') {
        // игнорируем возможные дублирующие навигации
        void router.push({ path: '/login', query: { returnTo } }).catch(() => {})
      }
    }
    return Promise.reject(error)
  }
}
