import { router } from '@/router'

export function onLoginSuccess() {
  const { query } = router.currentRoute.value
  const returnTo = typeof query.returnTo === 'string' ? query.returnTo : null
  router.push(returnTo ?? '/movies')
}
