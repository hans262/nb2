import { SESSION_EXPIRES } from '../conf';
import { Session, SessionStore } from '../Interface/Session';

export const SESSION: SessionStore = {}
export const KEY: string = 'SESSION_ID'
export const EXPIRES: number = SESSION_EXPIRES * 60 * 1000//20分钟

export function generate(): Session {
  const session: Session = {
    id: (Date.now() + Math.random()).toString(),
    expire: Date.now() + EXPIRES,
    count: 0
  }
  SESSION[session.id] = session
  return session
}

export function reset(id: string): boolean {
  const session: Session = SESSION[id]
  if (!session) return false
  session.expire = Date.now() + EXPIRES
  session.count++
  return true
}

export function remove(id: string): boolean {
  return SESSION[id] ? delete SESSION[id] : false
}

export function select(id: string): Session {
  return SESSION[id]
}