export function isValidUsername(username: string): boolean {
  return typeof username === 'string' && username.length >= 8
}

export function isValidPassword(password: string): boolean {
  if (typeof password !== 'string' || password.length < 8) return false
  const hasUpper = /[A-Z]/.test(password)
  const hasDigit = /\d/.test(password)
  return hasUpper && hasDigit
}

export function isPasswordConfirmed(password: string, confirm: string): boolean {
  return password === confirm
}


