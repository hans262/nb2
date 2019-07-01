export interface SessionStore {
  [index: string]: Session
}

export interface Session {
  id: string
  expire: number
  count: number
}