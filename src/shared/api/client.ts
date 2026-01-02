import axios from 'axios'
import { useAuthStore } from '@/features/auth/model/store'

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL ?? 'http://localhost:3022',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

apiClient.interceptors.request.use((config) => {
  const store = useAuthStore()
  const token = store.token
  if (token) {
    config.headers = config.headers ?? {}
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})
