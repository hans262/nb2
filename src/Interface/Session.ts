export type SessionStore = Map<string, Session>

export interface Session {
  id: string
  expire: number
  count: number
}