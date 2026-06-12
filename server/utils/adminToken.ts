import { createHmac } from 'node:crypto'

function sign(payload: string, secret: string) {
  return createHmac('sha256', secret).update(payload).digest('hex')
}

export function createAdminToken(secret: string) {
  const payload = `${Date.now()}_${Math.random().toString(36).slice(2)}`
  const sig = sign(payload, secret)
  return `${payload}.${sig}`
}

export function verifyAdminToken(token: string, secret: string): boolean {
  const lastDot = token.lastIndexOf('.')
  if (lastDot === -1) return false
  const payload = token.slice(0, lastDot)
  const sig = token.slice(lastDot + 1)
  return sig === sign(payload, secret)
}
