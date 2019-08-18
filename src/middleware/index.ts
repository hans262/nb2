import { LOGIN } from '../configure';
import { Middleware } from '../Interface/Middleware';
import { CheckController } from './CheckController';
import { CheckLogin } from './CheckLogin';
import { GetToken } from './GetToken';
import { Later } from './Later';
import { LoginPage } from './LoginPage';
import { Mount } from './Mount';
import { ResFavicon } from './ResFavicon';
import { ProxyServer } from './ProxyServer';

const combineMiddleware = <T>(...middleware: (T | false)[]): T[] =>
  middleware.filter((m: T | false): m is T => m !== false)

const MIDDLEWARE: Middleware[] = combineMiddleware<Middleware>(
  Mount,
  ResFavicon,
  ProxyServer,
  LOGIN && LoginPage,
  LOGIN && GetToken,
  LOGIN && CheckLogin,
  CheckController,
  Later
)

export default MIDDLEWARE