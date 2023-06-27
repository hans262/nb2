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