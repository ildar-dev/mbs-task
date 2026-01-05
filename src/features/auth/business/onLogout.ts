import { router } from '@/router'
import { useAuth } from '../composables/useAuth'
import { goToMain } from '@/shared/router/redirect'

const { logout } = useAuth()

export function onLogout() {
  logout()
  goToMain(router)
}