import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { Nicest, PUBLIC_PATH, PORT } from '../src/index.js';

import {
  CheckController, CheckLogin, Mounted,
  ProxyServer, ResFavicon, Static
} from './middleware/index.js';

const nicest = new Nicest({
  https: {
    key: readFileSync(join(PUBLIC_PATH, './localhost+1-key.pem')),
    cert: readFileSync(join(PUBLIC_PATH, 'localhost+1.pem'))
  }
})

nicest.use(
  Mounted,
  ResFavicon,
  ProxyServer,
  CheckLogin,
  CheckController,
  Static
)

nicest.run(PORT)