<template>
  <div class="max-w-md">
    <h2 class="text-2xl mb-6">Регистрация</h2>
    <form @submit.prevent="onSubmit" class="flex flex-col gap-4">
      <label class="flex flex-col gap-2">
        <span>Логин</span>
        <input v-model.trim="username" type="text" class="bg-black text-white border border-white p-2" required minlength="8" />
        <small v-if="username && !isValidUsername(username)" class="text-red-400">Минимум 8 символов</small>
      </label>
      <label class="flex flex-col gap-2">
        <span>Пароль</span>
        <input v-model="password" type="password" class="bg-black text-white border border-white p-2" required minlength="8" />
        <small v-if="password && !passwordValid" class="text-red-400">Минимум 8 символов, 1 заглавная буква и 1 цифра</small>
      </label>
      <label class="flex flex-col gap-2">
        <span>Подтверждение пароля</span>
        <input v-model="passwordConfirm" type="password" class="bg-black text-white border border-white p-2" required />
        <small v-if="passwordConfirm && !passwordsMatch" class="text-red-400">Пароли должны совпадать</small>
      </label>
      <p v-if="error" class="text-red-400">{{ error }}</p>
      <div class="flex gap-3">
        <button class="border border-white px-4 py-2" type="submit" :disabled="submitting || !formValid">Зарегистрироваться</button>
        <RouterLink class="underline" to="/login">У меня уже есть аккаунт</RouterLink>
      </div>
    </form>
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


