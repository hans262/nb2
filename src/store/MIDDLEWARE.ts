import { LOGIN } from '../conf'
import Mount from '../middleware/Mount'
import Login from '../middleware/Login'
import GetToken from '../middleware/GetToken'
import CheckLogin from '../middleware/CheckLogin'
import CheckController from '../middleware/CheckController'

const M = []
function useMiddleware(middleware) {
  M.push(middleware)
}

useMiddleware(Mount)
useMiddleware(Login)
useMiddleware(GetToken)
LOGIN && useMiddleware(CheckLogin)
useMiddleware(CheckController)
// useMiddleware(await import('../middleware/ResStatic'))


useMiddleware((req, res, next) => {
  res.end('ss')
})

export const MIDDLEWARE = M