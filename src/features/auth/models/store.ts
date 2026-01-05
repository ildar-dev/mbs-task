import { defineStore } from 'pinia'

type TAuthState = {
  token: string | null
}

export const useAuthStore = defineStore('auth', {
  state: (): TAuthState => ({
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


