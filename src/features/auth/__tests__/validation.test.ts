import { describe, it, expect } from 'vitest'
import {
  isValidUsername,
  isValidPassword,
  isPasswordConfirmed,
} from '../business/validation'

describe('auth validation', () => {
  describe('isValidUsername', () => {
    it('должен возвращать true для валидного имени пользователя (>= 8 символов)', () => {
      expect(isValidUsername('username1')).toBe(true)
      expect(isValidUsername('verylongusername')).toBe(true)
      expect(isValidUsername('12345678')).toBe(true)
    })

    it('должен возвращать false для короткого имени (< 8 символов)', () => {
      expect(isValidUsername('user')).toBe(false)
      expect(isValidUsername('')).toBe(false)
      expect(isValidUsername('1234567')).toBe(false)
    })

    it('должен возвращать false для не-строк', () => {
      expect(isValidUsername(null as any)).toBe(false)
      expect(isValidUsername(undefined as any)).toBe(false)
      expect(isValidUsername(123 as any)).toBe(false)
    })
  })

  describe('isValidPassword', () => {
    it('должен возвращать true для валидного пароля (>= 8 символов, есть заглавная буква и цифра)', () => {
      expect(isValidPassword('Password1')).toBe(true)
      expect(isValidPassword('MyPass123')).toBe(true)
      expect(isValidPassword('A12345678')).toBe(true)
    })

    it('должен возвращать false для короткого пароля (< 8 символов)', () => {
      expect(isValidPassword('Pass1')).toBe(false)
      expect(isValidPassword('1234567')).toBe(false)
    })

    it('должен возвращать false для пароля без заглавной буквы', () => {
      expect(isValidPassword('password1')).toBe(false)
      expect(isValidPassword('12345678')).toBe(false)
    })

    it('должен возвращать false для пароля без цифры', () => {
      expect(isValidPassword('Password')).toBe(false)
      expect(isValidPassword('MYLONGPASS')).toBe(false)
    })

    it('должен возвращать false для не-строк', () => {
      expect(isValidPassword(null as any)).toBe(false)
      expect(isValidPassword(undefined as any)).toBe(false)
    })
  })
})
