import { ServerResponse } from 'http';
import { Req } from '../Interface/Req';
import { Session } from '../Interface/Session';
import ResRedirect from '../respond/ResRedirect';
import { KEY, remove, reset, select } from '../store/SESSION';
import getCookie from '../utils/getCookie';
import setCookie from '../utils/setCookie';

export default function CheckLogin(req: Req, res: ServerResponse, next: Function): void {
  if (check(req, res)) {
    next()
  } else {
    ResRedirect({ res, location: '/login', code: 302, reasonPhrase: 'temporarily moved' })
  }
}

function check(req: Req, res: ServerResponse): boolean {
  const id: string = getCookie(req, KEY)
  if (!id) return false //id不存在
  const ses: Session = select(id)//-查询
  if (!ses) {
    //session不存在
    setCookie({
      res,
      key: KEY,
      value: 'delete',
      expires: new Date(),
      httpOnly: true
    })
    return false
  }
  if (ses.expire < Date.now()) {
    //超时
    remove(id)//-删除
    setCookie({
      res,
      key: KEY,
      value: 'delete',
      expires: new Date(),
      httpOnly: true
    })
    return false //转到登陆
  }
  reset(id)//-重置
  return true
}