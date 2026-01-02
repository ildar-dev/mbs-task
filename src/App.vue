<template>

  <div class="max-w-[1200px] mx-auto mt-[100px]">
    <header>
      <h1 class="text-4xl mb-6">{{ title }}</h1>
    </header>
    <div class="flex bg-black text-white border border-[3px] border-white">
      <aside class="max-h-[300px] w-64 border-r border-b border-white p-6">
        <nav class="flex flex-col gap-3">
          <RouterLink v-for="page in pages.filter(page => page.isOnMenu)" :key="page.path" class="hover:underline" :to="page.path">{{ page.title }}</RouterLink>
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
import { useRoute } from 'vue-router'

const pages = [
  { title: 'Фильмы', path: '/movies', header: 'Фильмы / Главная', isOnMenu: true },
  { title: 'Кинотеатры', path: '/cinemas', header: 'Кинотеатры', isOnMenu: true },
  { title: 'Мои билеты', path: '/tickets', header: 'Мои билеты', isOnMenu: true },
  { title: 'Вход', path: '/login', header: 'Вход', isOnMenu: true },
  { title: 'Регистрация', path: '/register', header: 'Регистрация', isOnMenu: false },
]

const route = useRoute()
const title = computed(() => pages.find(page => page.path === route.path)?.header ?? '')
</script>

<style scoped>
/* Базовая типографика */
:host,
main {
  line-height: 1.6;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji", sans-serif;
} 
</style>


