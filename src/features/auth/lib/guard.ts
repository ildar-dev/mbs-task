import type { NavigationGuardWithThis } from 'vue-router'
import { useAuthStore } from '../model/store'

export const authGuard: NavigationGuardWithThis<unknown> = (to) => {
  if (to.path === '/tickets') {
    const store = useAuthStore()
    if (!store.isAuthenticated) return { path: '/login' }
  }
  return true
}


