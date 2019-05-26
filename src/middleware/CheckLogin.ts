import getCookie from '../utils/getCookie'
import setCookie from '../utils/setCookie'
import ResRedirect from '../respond/ResRedirect'
import { KEY, select, remove, reset } from '../store/SESSION'

export default function CheckLogin(req, res, next) {
  if (check(req, res)) {
    next()
  } else {
    ResRedirect(res, '/login', 302, 'Temporarily Moved')
  }
}

function check(req, res) {
  let id = getCookie(req, KEY)
  if (!id) return false //id不存在
  const ses = select(id)//-查询
  if (!ses) {
    //session不存在
    setCookie(res, KEY, 'delete', {
      path: '/',
      expires: new Date(),
      httpOnly: true
    })
    return false
  }
  if (ses.expire < Date.now()) {
    //超时
    remove(id)//-删除
    setCookie(res, KEY, 'delete', {
      path: '/',
      expires: new Date(),
      httpOnly: true
    })
    return false //转到登陆
  }
  reset(id)//-重置
  return true
}