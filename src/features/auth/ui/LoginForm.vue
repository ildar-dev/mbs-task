<template>
  <div class="mx-auto">
    <h2 class="text-4xl mb-6 text-center">Вход</h2>
    <form @submit.prevent="onSubmit" class="max-w-[300px] flex flex-col mx-auto">
      <label class="flex flex-col gap-1">
        <span class="ml-1 text-sm">Логин</span>
        <input v-model.trim="username" type="text" placeholder="Введите логин" required minlength="8" />
      </label>
      <label class="mt-6 flex flex-col gap-1">
        <span class="ml-1 text-sm">Пароль</span>
        <input v-model="password" type="password" placeholder="Введите пароль" required minlength="8" />
      </label>
      <p v-if="error" class="mt-1 ml-1 text-sm text-red-400">{{ error }}</p>
      <button class="base mt-8 mx-auto" type="submit" :disabled="submitting">Войти</button>
    </form>
      <p class="text-2xl mt-7 text-center">Если у вас нет аккаунта <RouterLink class="under-line" to="/register">зарегистрируйтесь</RouterLink></p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAuth, onLoginSuccess } from '@/features/auth'

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


