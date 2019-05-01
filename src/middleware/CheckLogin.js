const getCookie = require('../utils/getCookie')
const setCookie = require('../utils/setCookie')
const redirect = require('../respond/redirect')
const { KEY, select, remove, reset, SESSION } = require('../store/SESSION')

function CheckLogin(req, res, next) {
  if (check(req, res)) {
    next()
  } else {
    redirect(res, '/login', 302, 'Temporarily Moved')
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

module.exports = CheckLogin