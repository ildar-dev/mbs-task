import type { Router } from 'vue-router'
import { redirectBack } from '@/shared/router/redirect'

export function onLoginSuccess(router: Router) {
  redirectBack(router)
}
