import { readFileSync } from 'node:fs'
import { WebServer } from '../src/index.js'
import { join } from 'node:path'
import { mounted } from './middleware/mounted.js';
import { proxy } from './middleware/proxy.js';
import { checkAuth } from './middleware/checkAuth.js';
import { LOGIN, PUBLIC_PATH } from './constant.js';
import { Controllers } from './controller/index.js';

const app = new WebServer({
  https: {
    key: readFileSync(join(PUBLIC_PATH, './localhost+1-key.pem')),
    cert: readFileSync(join(PUBLIC_PATH, 'localhost+1.pem'))
  },
  frontRoute: true,
  staticRoot: '/Users/macbookair/Desktop/develop/nicest',
  systemLogPath: '/Users/macbookair/Desktop/develop/nicest/logs'
})

app.useControllers(Controllers)

app.use(
  mounted,
  proxy,
)

LOGIN && app.use(checkAuth)

app.run()