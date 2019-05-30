import { LOGIN } from '../conf';
import { CheckController } from './CheckController';
import { CheckLogin } from './CheckLogin';
import { GetToken } from './GetToken';
import { Login } from './Login';
import { Mount } from './Mount';
import { ResStatic } from './ResStatic';
import { Middleware } from '../Interface/Middleware';

const MIDDLEWARE: Array<Middleware> = []

function useMiddleware(middleware: Middleware): void {
  MIDDLEWARE.push(middleware)
}

useMiddleware(Mount)
useMiddleware(Login)
useMiddleware(GetToken)
LOGIN && useMiddleware(CheckLogin)
useMiddleware(CheckController)
useMiddleware(ResStatic)

export default MIDDLEWARE