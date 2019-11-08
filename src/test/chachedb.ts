interface Token {
  id: string
  expire: number
  count: number
}

type TokenDb = Map<string, Token>

interface Store {
  token: TokenDb
}

const single: unique symbol = Symbol('instance')
export class CacheDb {
  private static [single]: CacheDb
  public static get instance(): CacheDb {
    if (!this[single]) {
      this[single] = new CacheDb()
    }
    return this[single]
  }
  private constructor() { }
  private store: Store = {
    token: new Map()
  }
  EXPIRES: number = 20 * 60 * 1000

  ADD_TOKEN() {
    const t: Token = {
      id: (Date.now() + Math.random()).toString(),
      expire: Date.now() + this.EXPIRES,
      count: 0
    }
    this.store.token.set(t.id, t)
  }

  DELETE_TOKEN(id: string) {
    return this.store.token.delete(id)
  }

  UPDATE_TOKEN(id: string) {
    const token = this.store.token.get(id)
    if (!token) return false
    this.store.token.set(id, {
      ...token,
      expire: Date.now() + this.EXPIRES,
      count: token.count + 1
    })
    return true
  }

  SELETE_TOKEN(id: string) {
    return this.store.token.get(id)
  }
}