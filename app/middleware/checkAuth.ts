import { Middleware, handleRedirect, Context, getCookie, setCookie } from '../../src/index.js';
import { KEY, reset, tokens } from '../token.js';

export const checkAuth: Middleware = (ctx, next) => {
  //排除不需要登录的接口
  const { req: { method }, pathname } = ctx
  if ((method === 'GET' && pathname === '/login') ||
    (method === 'POST' && pathname === '/getToken')
  ) {
    next()
    return
  }

  if (!isLogin(ctx)) {
    handleRedirect({ ctx, location: '/login', code: 302, reasonPhrase: 'temporarily moved' })
  } else {
    next()
  }
}

function isLogin(ctx: Context): boolean {
  const { req, res } = ctx
  const id = getCookie(req, KEY)
  //检查id
  if (!id) return false
  //查询
  const token = tokens.get(id)
  //不存在
  if (!token) {
    setCookie({ res, key: KEY, value: 'delete', expires: new Date(), httpOnly: true })
    return false
  }
  //超时
  if (token.expire < Date.now()) {
    tokens.delete(id)
    setCookie({ res, key: KEY, value: 'delete', expires: new Date(), httpOnly: true })
    return false
  }
  //存在 & 重置
  reset(id)
  return true
}