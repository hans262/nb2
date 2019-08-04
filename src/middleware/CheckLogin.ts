import { ServerResponse } from 'http';
import { Middleware } from '../Interface/Middleware';
import { Req } from '../Interface/Req';
import { Session } from '../Interface/Session';
import { KEY, remove, reset, select } from '../modules/Session';
import { ResRedirect } from '../respond/ResRedirect';
import { getCookie, setCookie } from '../common/cookie';

export const CheckLogin: Middleware = function (
  req: Req, res: ServerResponse, next: Function
): void {
  if (!isLogin(req, res)) {
    ResRedirect({ req, res, location: '/login', code: 302, reasonPhrase: 'temporarily moved' })
  } else {
    next()
  }
}

function isLogin(req: Req, res: ServerResponse): boolean {
  const id: string | null = getCookie(req, KEY)
  //检查id
  if (!id) return false
  //查询
  const ses: Session | undefined = select(id)
  //不存在
  if (!ses) {
    setCookie({ res, key: KEY, value: 'delete', expires: new Date(), httpOnly: true })
    return false
  }
  //超时
  if (ses.expire < Date.now()) {
    remove(id)
    setCookie({ res, key: KEY, value: 'delete', expires: new Date(), httpOnly: true })
    return false
  }
  //存在 & 重置
  reset(id)
  return true
}