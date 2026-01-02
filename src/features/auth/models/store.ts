import { defineStore } from 'pinia'

type AuthState = {
  token: string | null
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    token: null,
  }),
  getters: {
    isAuthenticated: state => !!state.token,
  },
  actions: {
    setToken(token: string | null) {
      this.token = token
    },
    logout() {
      this.setToken(null)
    },
  },
  persist: {
    paths: ['token'],
  },
})


