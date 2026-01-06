import { IInterceptorRequest } from './model'
import { useAuthStore } from '@/features/auth'

export const authHeaderInterceptor: IInterceptorRequest = {
  onFulfilled: config => {
    const store = useAuthStore()
    const token = store.token
    if (token) {
      config.headers = { ...(config.headers as any), Authorization: `Bearer ${token}` } as any
    }
    return config
  }
}
