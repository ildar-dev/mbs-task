export const BASE_URL = import.meta.env.VITE_BACKEND_URL ?? 'http://localhost:3022'

export const config = {
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
}
