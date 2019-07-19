import { SESSION_EXPIRES } from '../conf';
import { Session, SessionStore } from '../Interface/Session';

const SESSION: SessionStore = new Map()
export const KEY: string = 'SESSION_ID'
export const EXPIRES: number = SESSION_EXPIRES * 60 * 1000//20分钟

export function generate(): Session {
  const session: Session = {
    id: (Date.now() + Math.random()).toString(),
    expire: Date.now() + EXPIRES,
    count: 0
  }
  SESSION.set(session.id, session)
  return session
}

export function reset(id: string): boolean {
  const session: Session | undefined = SESSION.get(id)
  if (!session) return false
  SESSION.set(id, {
    ...session,
    expire: Date.now() + EXPIRES,
    count: session.count + 1
  })
  return true
}

export function remove(id: string): boolean {
  return SESSION.delete(id)
}

export function select(id: string): Session | undefined {
  return SESSION.get(id)
}