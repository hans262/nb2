// import { createHashSecret } from '../src/index.js';
// import { TOKEN_EXPIRES } from './common/constant.js';

// export type TokenStore = Map<string, Token>

// export interface Token {
//   id: string
//   /**
//    * 到期时间
//    */
//   expire: number
//   /**
//    * 该用户请求次数
//    */
//   count: number,
//   /**
//    * 用户信息
//    */
//   userInfo?: { [key: string]: any }
// }

// /**
//  * token仓库
//  */
// export const tokens: TokenStore = new Map()

// /**token的键名 */
// export const KEY = 'auth'

// const EXPIRES = TOKEN_EXPIRES * 60 * 1000 //转成毫秒

// export function generate(userInfo?: Token['userInfo']) {
//   const id = createHashSecret((Date.now() + Math.random()).toString())
//   //id判重
//   if (tokens.has(id)) {
//     generate(userInfo)
//   }

//   //设置
//   const _token: Token = {
//     id, expire: Date.now() + EXPIRES,
//     count: 0, userInfo
//   }
//   tokens.set(_token.id, _token)
//   return _token
// }


// /**
//  * 有新的请求，刷新到期时间
//  * @param id 
//  * @returns 
//  */
// export function reset(id: string) {
//   const _token = tokens.get(id)
//   if (!_token) return false
//   tokens.set(id, {
//     ..._token,
//     expire: Date.now() + EXPIRES,
//     count: _token.count + 1
//   })
//   return true
// }



// import { Middleware, Context, } from '../../src/index.js';
// import { KEY, reset, tokens } from '../token.js';

// export const handleCheckAuth: Middleware = (ctx, next) => {
//   const { req, pathname } = ctx

//   //排除不需要登录的接口
//   if (
//     (req.method === 'GET' && pathname === '/api/login/page') ||
//     (req.method === 'POST' && pathname === '/api/login/get_token')
//   ) return next()

//   if (!isLogin(ctx)) {
//     ctx.redirect('/api/login/page', 302)
//   } else {
//     next()
//   }
// }

// function isLogin(ctx: Context) {
//   const id = ctx.getCookie(KEY)
//   //检查id
//   if (!id) return false
//   //查询
//   const token = tokens.get(id)
//   //不存在
//   if (!token) {
//     ctx.setCookie(KEY, 'delete', { expires: new Date(), httpOnly: true })
//     return false
//   }
//   //超时
//   if (token.expire < Date.now()) {
//     tokens.delete(id)
//     ctx.setCookie(KEY, 'delete', { expires: new Date(), httpOnly: true })
//     return false
//   }
//   //存在 & 重置
//   reset(id)
//   return true
// }


// @Get('/page')
  // page(ctx: Context) {
  //   const body = `
  //     <form action="/api/login/get_token" method="post">
  //       Username: <input type="text" name="username">
  //       Password: <input type="password" name="password">
  //       <input type="submit">
  //     </form>
  //   `
  //   ctx.res.setHeader('Content-Length', Buffer.byteLength(body))
  //   ctx.statusCode(200).html(body)
  // }

  // @Post('/get_token')
  // async get_token(ctx: Context) {
  //   const buffer = await ctx.getBodyData()
  //   const toQueryString = buffer.toString()
  //   const toObj = new URLSearchParams(toQueryString)
  //   const [username, password] = [toObj.get('username'), toObj.get('password')]
  //   if (username === USER.username && password === USER.password) {
  //     const token = generate()
  //     ctx.setCookie(KEY, token.id, { path: '/', expires: new Date(token.expire), httpOnly: true })
  //     ctx.redirect('/', 302)
  //   } else {
  //     ctx.redirect('/api/login/page', 302)
  //   }
  // }