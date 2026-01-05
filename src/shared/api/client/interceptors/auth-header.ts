import { IInterceptorRequestCallback } from './model'
import { useAuthStore } from '@/features/auth/models/store'

export const authHeaderInterceptor: IInterceptorRequestCallback = {
  onFulfilled: config => {
    const store = useAuthStore()
    const token = store.token
    if (token) {
      // Безопасно добавляем заголовок, учитывая типы Axios v1
      config.headers = { ...(config.headers as any), Authorization: `Bearer ${token}` } as any
    }
    return config
  }
}
