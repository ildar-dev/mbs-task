import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import { authGuard } from '@/features/auth/business/guard'

const routes: RouteRecordRaw[] = [
  { path: '/', redirect: '/movies' },
  { path: '/movies', name: 'movies', component: () => import('../views/Movies.vue') },
  { path: '/cinemas', name: 'cinemas', component: () => import('../views/Cinemas.vue') },
  { path: '/tickets', name: 'tickets', component: () => import('../views/Tickets.vue') },
  { path: '/login', name: 'login', component: () => import('../views/Login.vue') },
  { path: '/register', name: 'register', component: () => import('../views/Register.vue') },
  { path: '/movie/:id', name: 'movie', component: () => import('../views/Movie.vue') },
  { path: '/cinema/:id', name: 'cinema', component: () => import('../views/Cinema.vue') },
  { path: '/session/:id', name: 'session', component: () => import('../views/Session.vue') },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach(authGuard)

export default router


