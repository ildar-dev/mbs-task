import axios from 'axios'

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL ?? 'http://localhost:3022',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})


