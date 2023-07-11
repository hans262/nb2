import { TOKEN_EXPIRES } from './constant.js';

export type TokenStore = Map<string, Token>
export interface Token {
  id: string
  /**
   * 到期时间
   */
  expire: number
  /**
   * 请求次数
   */
  count: number
}

/**
 * token仓库
 */
export const tokens: TokenStore = new Map()

/**token的键名 */
export const KEY: string = 'auth'

const EXPIRES = TOKEN_EXPIRES * 60 * 1000 //转成毫秒

export function generate() {
  const _token: Token = {
    id: (Date.now() + Math.random()).toString(),
    expire: Date.now() + EXPIRES,
    count: 0
  }
  tokens.set(_token.id, _token)
  return _token
}

/**
 * 有新的请求，刷新到期时间
 * @param id 
 * @returns 
 */
export function reset(id: string) {
  const _token = tokens.get(id)
  if (!_token) return false
  tokens.set(id, {
    ..._token,
    expire: Date.now() + EXPIRES,
    count: _token.count + 1
  })
  return true
}