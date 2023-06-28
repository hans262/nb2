import { createReadStream } from 'node:fs';
import { Context } from "../ainterface/Context.js";
import { DEBUG } from '../common/logger.js';

export function responseFile(ctx: Context) {
  const { staticPath, startTime, res } = ctx
  const stream = createReadStream(staticPath)
  res.writeHead(200, 'Responed file')
  stream.pipe(res)
  DEBUG({
    type: 'RES_FILE',
    msg: staticPath + ' +' + (Date.now() - startTime) + 'ms'
  })
}