const MIDDLEWARE = []

function useMiddleware(middleware) {
  MIDDLEWARE.push(middleware)
}

useMiddleware(require('../middleware/Mount'))
useMiddleware(require('../middleware/Login'))
useMiddleware(require('../middleware/GetToken'))
useMiddleware(require('../middleware/CheckLogin'))
useMiddleware(require('../middleware/CheckController'))

useMiddleware((req,res,next)=>{
  res.end('C')
})
module.exports = {
  MIDDLEWARE
}