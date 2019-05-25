import { LOGIN } from '../conf'
export const MIDDLEWARE = []

function useMiddleware(middleware) {
  MIDDLEWARE.push(middleware)
}

useMiddleware(require('../middleware/Mount'))
useMiddleware(require('../middleware/Login'))
useMiddleware(require('../middleware/GetToken'))

LOGIN && useMiddleware(require('../middleware/CheckLogin'))

useMiddleware(require('../middleware/CheckController'))
useMiddleware(require('../middleware/ResStatic'))