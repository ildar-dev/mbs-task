import { router } from '@/router'
import { redirectBack } from '@/shared/router/redirect'

export function onLoginSuccess() {
  redirectBack(router)
}
