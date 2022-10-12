import { Context } from '../interface/Context.js';
import { DEBUG } from '../modules/logger.js';

export function ResCache(ctx: Context) {
  const { absolutePath, startTime, res } = ctx
  res.writeHead(304, 'Not Modified')
  res.end()
  DEBUG({
    type: 'RES_CACHE',
    msg: absolutePath + ' +' + (Date.now() - startTime) + 'ms'
  })
}