import { useRedirectBack } from '@/shared/router/useRedirectBack'

const { redirectBack } = useRedirectBack()

export function onLoginSuccess() {
  redirectBack()
}
