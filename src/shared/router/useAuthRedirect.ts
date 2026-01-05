import { useRoute, useRouter } from 'vue-router'
import { goToLogin } from './redirect'

export function useAuthRedirect() {
  const router = useRouter()
  const route = useRoute()

  function toLogin(returnTo?: string) {
    const target = returnTo ?? route.fullPath ?? '/'
    return goToLogin(router, target)
  }

  return { toLogin }
}
