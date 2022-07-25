import { createReadStream, ReadStream } from 'node:fs';
import { Context } from "../Interface/Context.js";
import { DEBUG } from '../modules/logger.js';

export function ResFile(ctx: Context) {
  const { absolutePath, startTime, res } = ctx
  const stream: ReadStream = createReadStream(absolutePath!)
  res.writeHead(200, 'Responed file')
  stream.pipe(res)
  DEBUG({
    type: 'RES_FILE',
    msg: absolutePath! + ' +' + (Date.now() - startTime!) + 'ms'
  })
}