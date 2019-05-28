export interface SessionStore {
  [id: string]: Session
}
export interface Session {
  id: string
  expire: number
  count: number
}