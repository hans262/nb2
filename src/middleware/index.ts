import { LOGIN } from '../conf';
import CheckController from './CheckController';
import CheckLogin from './CheckLogin';
import GetToken from './GetToken';
import Login from './Login';
import Mount from './Mount';
import ResStatic from './ResStatic';


const MIDDLEWARE: Array<Function> = []

function useMiddleware(middleware: Function): void {
  MIDDLEWARE.push(middleware)
}

useMiddleware(Mount)
useMiddleware(Login)
useMiddleware(GetToken)
LOGIN && useMiddleware(CheckLogin)
useMiddleware(CheckController)
useMiddleware(ResStatic)

export default MIDDLEWARE