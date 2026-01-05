import { router } from '@/router'
import { useAuth } from '../composables/useAuth'
import { goToMain } from '@/shared/router/redirect'

export function onLogout() {
  const { logout } = useAuth()
  logout()
  goToMain(router)
}