<template>
  <div class="max-w-[1200px] mx-auto mt-[100px]">
    <header>
      <h1 class="text-4xl mb-6">{{ title }}</h1>
    </header>
    <div class="flex bg-black text-white border border-[3px] border-white">
      <aside class="max-h-[300px] w-64 border-r border-b border-white p-6">
        <nav class="flex flex-col gap-3">
          <RouterLink v-for="page in visiblePages" :key="page.path" class="hover:underline" :to="page.path">{{ page.title }}</RouterLink>
          <button v-if="isAuthenticated" class="text-left hover:underline" @click="onLogout">Выход</button>
        </nav>
      </aside>
      <main class="min-h-[800px] flex-1 p-6">
        <RouterView />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuth } from '@/features/auth/composables/useAuth'
import { pages } from './index'

const route = useRoute()
const title = computed(() => pages.find(page => page.path === route.path)?.header ?? '')

const { isAuthenticated, logout } = useAuth()
const visiblePages = computed(() =>
  pages.filter(p => p.isOnMenu && (!isAuthenticated.value || p.path !== '/login'))
)
const router = useRouter()
function onLogout() {
  logout()
  router.push('/movies')
}
</script>

<style scoped>
/* Базовая типографика */
:host,
main {
  line-height: 1.6;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji", sans-serif;
} 
</style>


