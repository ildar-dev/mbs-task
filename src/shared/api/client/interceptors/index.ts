import { authHeaderInterceptor } from './auth-header'
import { unauthorizedInterceptor } from './unauthorized'
import { errorNormalizeInterceptor } from './errorNormalize'

export const interceptors = {
  request: [authHeaderInterceptor],
  response: [unauthorizedInterceptor, errorNormalizeInterceptor],
}
