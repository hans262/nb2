import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { Nicest, PUBLIC_PATH, PORT } from '../index.js';

import {
  checkController, checkAuth, mounted,
  proxy, favicon, statics
} from '../middleware/index.js';

const nicest = new Nicest({
  https: {
    key: readFileSync(join(PUBLIC_PATH, './localhost+1-key.pem')),
    cert: readFileSync(join(PUBLIC_PATH, 'localhost+1.pem'))
  }
})

nicest.use(
  mounted,
  favicon,
  proxy,
  checkAuth,
  checkController,
  statics
)

nicest.run(PORT)