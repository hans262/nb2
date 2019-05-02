const { MIDDLEWARE } = require('../store/MIDDLEWARE')

function HANDLER(req, res) {
  let i = 0
  function next() {
    let middleware = MIDDLEWARE[i++]
    if (!middleware) return
    middleware(req, res, next)
  }
  next()
}

module.exports = {
  HANDLER
}