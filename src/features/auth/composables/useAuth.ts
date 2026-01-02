import { storeToRefs } from 'pinia'
import { useAuthStore } from '../model/store'
import { login as apiLogin } from '@/shared/api/auth/login'
import { register as apiRegister } from '@/shared/api/auth/register'

export function useAuth() {
  const store = useAuthStore()
  const { isAuthenticated } = storeToRefs(store)

  async function login(username: string, password: string): Promise<void> {
    const { token } = await apiLogin({ username, password })
    store.token = token
  }

  async function register(username: string, password: string): Promise<void> {
    const { token } = await apiRegister({ username, password })
    store.token = token
  }

  function logout(): void {
    store.token = null
  }

  return { isAuthenticated, login, register, logout }
}


