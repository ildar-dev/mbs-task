import axios from 'axios'
import { interceptors } from './interceptors'
import { config } from './config'

export const apiClient = axios.create(config);

interceptors.request.forEach(interceptor => {
  apiClient.interceptors.request.use(
    interceptor.onFulfilled,
    interceptor.onRejected,
    interceptor.options,
  )
})
interceptors.response.forEach(interceptor => {
  apiClient.interceptors.response.use(
    interceptor.onFulfilled,
    interceptor.onRejected,
  )
})
