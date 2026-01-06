import type { Router } from 'vue-router'
import { useAuth } from '../composables/useAuth'
import { goToMain } from '@/shared/router/redirect'

export function onLogout(router: Router) {
  const { logout } = useAuth()
  logout()
  goToMain(router)
}