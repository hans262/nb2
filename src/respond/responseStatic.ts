import { stat } from 'node:fs';
import { Context } from '../interface/Context.js';
import { responseDir } from './responseDir.js';
import { responseVerify } from './responseVerify.js';
import { handle404 } from '../middleware/handle404.js';

export function responseStatic(ctx: Context) {
  stat(ctx.staticPath, (err, stats) => {
    if (err) {
      return handle404(ctx)
    }

    if (stats.isDirectory()) {
      return responseDir(ctx)
    }

    if (stats.isFile()) {
      return responseVerify(ctx, stats)
    }
  })
}