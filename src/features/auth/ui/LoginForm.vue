<template>
  <div class="max-w-md">
    <h2 class="text-2xl mb-6">Вход</h2>
    <form @submit.prevent="onSubmit" class="flex flex-col gap-4">
      <label class="flex flex-col gap-2">
        <span>Логин</span>
        <input v-model.trim="username" type="text" class="bg-black text-white border border-white p-2" required minlength="8" />
      </label>
      <label class="flex flex-col gap-2">
        <span>Пароль</span>
        <input v-model="password" type="password" class="bg-black text-white border border-white p-2" required minlength="8" />
      </label>
      <p v-if="error" class="text-red-400">{{ error }}</p>
      <div class="flex gap-3">
        <button class="border border-white px-4 py-2" type="submit" :disabled="submitting">Войти</button>
        <RouterLink class="underline" to="/register">Регистрация</RouterLink>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAuth } from '@/features/auth/composables/useAuth'
import { onLoginSuccess } from '@/features/auth/business/onLoginSuccess'

const username = ref('')
const password = ref('')
const error = ref('')
const submitting = ref(false)

const { login } = useAuth()

async function onSubmit() {
  error.value = ''
  submitting.value = true
  try {
    await login(username.value, password.value)
    onLoginSuccess()
  } catch {
    error.value = 'Неверный логин или пароль. Проверьте введенные данные и попробуйте снова'
  } finally {
    submitting.value = false
  }
}
</script>


