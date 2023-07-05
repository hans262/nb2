import { createReadStream } from 'node:fs';
import { Context } from "../interface/Context.js";
import { stdlog } from '../common/logger.js';

export function responseFile(ctx: Context) {
  const { staticPath, startTime, res } = ctx
  const stream = createReadStream(staticPath)
  res.writeHead(200, 'Responed file')
  stream.pipe(res)
  stdlog({
    type: 'file',
    msg: staticPath + ' +' + (Date.now() - startTime) + 'ms'
  })
}