const { MIDDLEWARE } = REQUIRE('src/store/MIDDLEWARE')

function HANDLER(req, res) {
  let i = 0
  function next(err) {
    let middleware = MIDDLEWARE[i++]
    if (!middleware) return
    middleware(req, res, next)
  }
  next()
}

module.exports = {
  HANDLER
}