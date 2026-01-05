import { useRoute, useRouter } from 'vue-router'
import { goTo } from './redirect'
import { MAIN_PAGE } from './models/routes'

export function useRedirectBack() {
  const router = useRouter()
  const route = useRoute()

  function redirectBack(returnTo?: string) {
    const target = returnTo ?? route.fullPath ?? MAIN_PAGE
    return goTo(router, target)
  }

  return { redirectBack }
}
