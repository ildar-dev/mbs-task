<template>
  <div class="max-w-[1200px] mx-auto mt-[100px]">
    <header>
      <h1 class="text-4xl mb-6">{{ title }}</h1>
    </header>
    <div class="flex bg-black text-white border border-[3px] border-white">
      <aside class="max-h-[300px] w-64 border-r border-b border-white pt-[40px] pb-[200px]">
        <nav class="flex flex-col gap-0">

          <RouterLink v-for="page in visiblePages" :key="page.name" :to="{ name: page.name as any }">
            <button class="link-button w-full" :class="{ 'selected': page.name === route.name }">{{ page.title }}</button>
          </RouterLink>
          <button v-if="isAuthenticated" class="link-button w-full" @click="onLogoutClick">Выход</button>
        </nav>
      </aside>
      <main class="min-h-[800px] flex-1 p-[80px] pt-[50px]">
        <RouterView />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useAuth, onLogout } from '@/features/auth'
import { pages } from './models/pages'

const route = useRoute()
const title = computed(() => pages.find(page => page.name === route.name)?.header ?? '')

const { isAuthenticated } = useAuth()
const visiblePages = computed(() =>
  pages.filter(p => p.isOnMenu && (!isAuthenticated.value || p.name !== 'login'))
)

function onLogoutClick() {
  onLogout()
}
</script>
<style scoped>
button.link-button {
  background: transparent;
  color: #fff;
  font-size: 24px;
  text-align: left;
  padding: 12px 20px;
  border-top: 1px solid transparent;
  border-bottom: 1px solid transparent;
}

button.link-button.selected {
  background: rgb(45, 45, 45);
  border-top: 1px solid rgb(200, 200, 200);
  border-bottom: 1px solid rgb(200, 200, 200);
}
</style>