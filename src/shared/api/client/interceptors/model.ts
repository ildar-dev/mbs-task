import type { AxiosResponse, InternalAxiosRequestConfig, AxiosInterceptorOptions } from 'axios'

export interface IInterceptorResponseCallback {
  onFulfilled?: (value: AxiosResponse) => AxiosResponse | Promise<AxiosResponse>,
  onRejected?: (error: any) => any,
};

export interface IInterceptorRequestCallback {
  onFulfilled?: (config: InternalAxiosRequestConfig) => InternalAxiosRequestConfig | Promise<InternalAxiosRequestConfig>,
  onRejected?: (error: any) => any,
  options?: AxiosInterceptorOptions,
};
