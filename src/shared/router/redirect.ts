import type { Router } from 'vue-router'
import { LOGIN_PAGE, MAIN_PAGE } from './models/routes'

export function goToWithReturnTo(router: Router, to: string, returnTo?: string) {
  const current = router.currentRoute.value
  const target = returnTo ?? current?.fullPath ?? '/'
  if (current?.path !== to) {
    void router.push({ path: to, query: { returnTo: target } }).catch(() => {})
  }
}

export function goToLogin(router: Router, returnTo?: string) {
  goToWithReturnTo(router, LOGIN_PAGE, returnTo)
}

export function goToMain(router: Router) {
  goToWithReturnTo(router, MAIN_PAGE)
}

export function redirectBack(router: Router, fallback: string = MAIN_PAGE) {
  const current = router.currentRoute.value
  const q = current?.query
  const returnTo = typeof q?.returnTo === 'string' ? q!.returnTo : null
  void router.push(returnTo ?? fallback).catch(() => {})
}
