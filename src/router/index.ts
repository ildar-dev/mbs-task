import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  { path: '/', redirect: '/movies' },
  { path: '/movies', name: 'movies', component: () => import('../views/Movies.vue') },
  { path: '/cinemas', name: 'cinemas', component: () => import('../views/Cinemas.vue') },
  { path: '/tickets', name: 'tickets', component: () => import('../views/Tickets.vue') },
  { path: '/login', name: 'login', component: () => import('../views/LoginView.vue') },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router


