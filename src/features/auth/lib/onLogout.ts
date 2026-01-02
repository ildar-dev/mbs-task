import { router } from '@/router'
import { useAuth } from '../composables/useAuth'

const { logout } = useAuth()

export function onLogout() {
  logout()
  router.push('/movies')
}