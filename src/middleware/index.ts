import { LOGIN } from '../conf'

import Mount from './Mount'
import Login from './Login'
import GetToken from './GetToken'
import CheckLogin from './CheckLogin'
import CheckController from './CheckController'
import ResStatic from './ResStatic'

const MIDDLEWARE: Array<any> = []

function useMiddleware(middleware) {
  MIDDLEWARE.push(middleware)
}

useMiddleware(Mount)
useMiddleware(Login)
useMiddleware(GetToken)
LOGIN && useMiddleware(CheckLogin)
useMiddleware(CheckController)
useMiddleware(ResStatic)

export default MIDDLEWARE