import type { NavigationGuard } from 'vue-router'
import { useAuthStore } from '../models/store'

export const authGuard: NavigationGuard = (to) => {
  if (to.path === '/tickets') {
    const store = useAuthStore()
    if (!store.isAuthenticated) return { path: '/login' }
  }
  return true
}
