import { SESSION_EXPIRES } from '../conf'

export const SESSION = {}
export const KEY = 'SESSION_ID'
export const EXPIRES = SESSION_EXPIRES * 60 * 1000//20分钟

export function generate() {
  const session = {
    id: Date.now() + Math.random(),
    expire: Date.now() + EXPIRES,
    count: 0
  }
  SESSION[session.id] = session
  return session
}

export function reset(id) {
  const session = SESSION[id]
  session.expire = Date.now() + EXPIRES
  session.count++
}

export function remove(id) {
  delete SESSION[id]
}

export function select(id) {
  return SESSION[id]
}