import { storeToRefs } from 'pinia'
import { useAuthStore } from '../model/store'
import { login as apiLogin, register as apiRegister } from '@/shared/api'

export function useAuth() {
  const store = useAuthStore()
  const { isAuthenticated } = storeToRefs(store)

  async function login(username: string, password: string): Promise<void> {
    const { token } = await apiLogin({ username, password })
    store.setToken(token)
  }

  async function register(username: string, password: string): Promise<void> {
    const { token } = await apiRegister({ username, password })
    store.setToken(token)
  }

  function logout(): void {
    store.logout()
  }

  return { isAuthenticated, login, register, logout }
}


