import { Middleware } from '../Interface/Middleware.js';
import { CheckController } from './CheckController.js';
import { CheckLogin } from './CheckLogin.js';
import { Static } from './Static.js';
import { Mount } from './Mount.js';
import { ResFavicon } from './ResFavicon.js';
import { ProxyServer } from './ProxyServer.js';

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