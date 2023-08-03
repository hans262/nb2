import { readFileSync } from 'node:fs'
import { WebServer } from '../src/index.js'
import { join } from 'node:path'
import { handleProxy } from './middleware/handleProxy.js';
import { handleCheckAuth } from './middleware/handleCheckAuth.js';
import { LOGIN, PUBLIC_PATH } from './constant.js';
import { Controllers } from './controller/index.js';


const argvPort = process.argv.find(v => v.includes('port='))?.split('=')?.[1]
// console.log(argvPort)
// const a = Number(argvPort)

const app = new WebServer({
  port: isNaN(Number(argvPort)) ? undefined : Number(argvPort),
  https: {
    key: readFileSync(join(PUBLIC_PATH, './localhost+1-key.pem')),
    cert: readFileSync(join(PUBLIC_PATH, 'localhost+1.pem'))
  },
  frontRoute: true,
  staticRoot: PUBLIC_PATH,
  systemLogPath: join(PUBLIC_PATH, '../logs')
})

app.useControllers(Controllers)

app.use(handleProxy)
LOGIN && app.use(handleCheckAuth)

app.run()