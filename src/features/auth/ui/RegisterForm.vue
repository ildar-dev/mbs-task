<template>
  <div class="mx-auto">
    <h2 class="text-4xl mb-6 text-center">Регистрация</h2>
    <form @submit.prevent="onSubmit" class="max-w-[300px] flex flex-col mx-auto">
      <label class="flex flex-col gap-1">
        <span class="ml-1 text-sm">Логин</span>
        <input v-model.trim="username" type="text" placeholder="Введите логин" required minlength="8" />
        <small v-if="username && !isValidUsername(username)" class="mt-1 ml-1 text-sm text-red-400">Минимум 8 символов</small>
      </label>
      <label class="mt-6 flex flex-col gap-1">
        <span class="ml-1 text-sm">Пароль</span>
        <input v-model="password" type="password" placeholder="Введите пароль" required minlength="8" />
        <small v-if="password && !passwordValid" class="mt-1 ml-1 text-sm text-red-400">Минимум 8 символов, 1 заглавная буква и 1 цифра</small>
      </label>
      <label class="mt-6 flex flex-col gap-1">
        <span class="ml-1 text-sm">Подтверждение пароля</span>
        <input v-model="passwordConfirm" type="password" placeholder="Повторите пароль" required />
        <small v-if="passwordConfirm && !passwordsMatch" class="mt-1 ml-1 text-sm text-red-400">Пароли должны совпадать</small>
      </label>
      <p v-if="error" class="mt-1 ml-1 text-sm text-red-400">{{ error }}</p>
      <button class="base mt-8 mx-auto" type="submit" :disabled="submitting || !formValid">Зарегистрироваться</button>
    </form>
    <p class="text-2xl mt-7 text-center">
      Если вы уже зарегистрированы
      <RouterLink class="under-line" to="/login">войдите</RouterLink>
    </p>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useAuth } from '@/features/auth/composables/useAuth'
import { onLoginSuccess } from '@/features/auth/business/onLoginSuccess'
import { isValidUsername, isValidPassword, isPasswordConfirmed } from '@/features/auth/business/validation'

const username = ref('')
const password = ref('')
const passwordConfirm = ref('')
const error = ref('')
const submitting = ref(false)

const { register } = useAuth()

const passwordValid = computed(() => isValidPassword(password.value))
const passwordsMatch = computed(() => isPasswordConfirmed(password.value, passwordConfirm.value))
const usernameValid = computed(() => isValidUsername(username.value))

const formValid = computed(() => {
  return [usernameValid.value, passwordValid.value, passwordsMatch.value].every(x => x);
})

async function onSubmit() {
  if (!formValid.value) return
  error.value = ''
  submitting.value = true
  try {
    await register(username.value, password.value)
    onLoginSuccess()
  } catch (e) {
    error.value = e instanceof Error ? (e.message) : 'Не удалось зарегистрироваться'
  } finally {
    submitting.value = false
  }
}
</script>


