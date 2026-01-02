<script setup lang="ts">
</script>

<template>
  <header class="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
    <h1 class="text-xl font-bold">mbs-test</h1>
    <nav class="flex gap-4">
      <RouterLink class="text-blue-600 dark:text-blue-400 hover:underline" to="/">Главная</RouterLink>
      <RouterLink class="text-blue-600 dark:text-blue-400 hover:underline" to="/about">О проекте</RouterLink>
    </nav>
  </header>
  <main class="p-6">
    <RouterView />
  </main>
</template>

<style scoped>
/* Базовая типографика */
:host,
main {
  line-height: 1.6;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji", sans-serif;
} 
</style>


