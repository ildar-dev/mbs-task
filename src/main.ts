import { createApp } from 'vue'
import App from './App.vue'
import './style.css'
import { router } from './router'
import { createPinia } from 'pinia'
import persistedstate from 'pinia-plugin-persistedstate'

const app = createApp(App)
const pinia = createPinia()
pinia.use(persistedstate)
app.use(pinia)
app.use(router)
app.mount('#app')
