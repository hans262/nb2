import { Middleware } from '../Interface/Middleware';
import { CheckController } from './CheckController';
import { CheckLogin } from './CheckLogin';
import { Static } from './Static';
import { Mount } from './Mount';
import { ResFavicon } from './ResFavicon';
import { ProxyServer } from './ProxyServer';

const combineMiddleware = <T>(...middleware: T[]) => middleware

const MIDDLEWARE = combineMiddleware<Middleware>(
  Mount,
  ResFavicon,
  ProxyServer,
  CheckLogin,
  CheckController,
  Static
)

export default MIDDLEWARE