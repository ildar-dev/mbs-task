import type { Router } from 'vue-router'
import { LOGIN_PAGE, MAIN_PAGE } from './models/routes'

export function goTo(router: Router, to: string, returnTo?: string) {
  const current = router.currentRoute.value
  const target = returnTo ?? current?.fullPath ?? '/'
  if (current?.path !== to) {
    void router.push({ path: to, query: { returnTo: target } }).catch(() => {})
  }
}

export function goToLogin(router: Router, returnTo?: string) {
  goTo(router, LOGIN_PAGE, returnTo)
}

export function goToMain(router: Router) {
  goTo(router, MAIN_PAGE)
}
