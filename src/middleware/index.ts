import { LOGIN } from '../conf';
import { Middleware } from '../Interface/Middleware';
import { CheckController } from './CheckController';
import { CheckLogin } from './CheckLogin';
import { GetToken } from './GetToken';
import { Later } from './Later';
import { LoginPage } from './LoginPage';
import { Mount } from './Mount';
import { ResFavicon } from './ResFavicon';

const MIDDLEWARE: Array<Middleware> = []

function useMiddleware(middleware: Middleware): void {
  MIDDLEWARE.push(middleware)
}

useMiddleware(Mount)
useMiddleware(ResFavicon)
LOGIN && useMiddleware(LoginPage)
LOGIN && useMiddleware(GetToken)
LOGIN && useMiddleware(CheckLogin)
useMiddleware(CheckController)
useMiddleware(Later)

export default MIDDLEWARE