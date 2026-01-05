import { authHeaderInterceptor } from './auth-header'
import { unauthorizedInterceptor } from './unauthorized'

export const interceptors = {
  request: [authHeaderInterceptor],
  response: [unauthorizedInterceptor],
}
