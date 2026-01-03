import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import { authGuard } from '@/features/auth/business/guard'

const routes: RouteRecordRaw[] = [
  { path: '/', redirect: '/movies' },
  { path: '/movies', name: 'movies', component: () => import('../pages/Movies.vue') },
  { path: '/cinemas', name: 'cinemas', component: () => import('../pages/Cinemas.vue') },
  { path: '/bookings', name: 'bookings', component: () => import('../pages/Bookings.vue') },
  { path: '/login', name: 'login', component: () => import('../pages/Login.vue') },
  { path: '/register', name: 'register', component: () => import('../pages/Register.vue') },
  { path: '/movie/:id', name: 'movie', component: () => import('../pages/Movie.vue') },
  { path: '/cinema/:id', name: 'cinema', component: () => import('../pages/Cinema.vue') },
  { path: '/session/:id', name: 'session', component: () => import('../pages/Session.vue') },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach(authGuard)

export default router


