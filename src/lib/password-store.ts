// Password management store - shared between auth and reset-password API
// In production, this should be a database

export const passwordStore: Record<string, string> = {}

export function storeResetPassword(email: string, password: string) {
  passwordStore[email.toLowerCase()] = password
}

export function getStoredPassword(email: string): string | null {
  return passwordStore[email.toLowerCase()] || null
}

export function clearResetPassword(email: string) {
  delete passwordStore[email.toLowerCase()]
}
