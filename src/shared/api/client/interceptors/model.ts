import type { AxiosResponse, InternalAxiosRequestConfig, AxiosInterceptorOptions } from 'axios'

export interface IInterceptorResponse {
  onFulfilled?: (value: AxiosResponse) => AxiosResponse | Promise<AxiosResponse>
  onRejected?: (error: any) => any
}

export interface IInterceptorRequest {
  onFulfilled?: (config: InternalAxiosRequestConfig) => InternalAxiosRequestConfig | Promise<InternalAxiosRequestConfig>,
  onRejected?: (error: any) => any,
  options?: AxiosInterceptorOptions,
};
