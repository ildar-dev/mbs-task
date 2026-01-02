import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import { authGuard } from '@/features/auth/lib/guard'

const routes: RouteRecordRaw[] = [
  { path: '/', redirect: '/movies' },
  { path: '/movies', name: 'movies', component: () => import('../views/Movies.vue') },
  { path: '/cinemas', name: 'cinemas', component: () => import('../views/Cinemas.vue') },
  { path: '/tickets', name: 'tickets', component: () => import('../views/Tickets.vue') },
  { path: '/login', name: 'login', component: () => import('../views/Login.vue') },
  { path: '/register', name: 'register', component: () => import('../views/Register.vue') },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach(authGuard)

export default router


