import { stat } from 'node:fs';
import { Context } from '../interface/Context.js';
import { ResDir } from './ResDir.js';
import { ResVerify } from './ResVerify.js';
import { handle404 } from '../middleware/handle404.js';

export function resStatic(ctx: Context) {
  stat(ctx.staticPath, (err, stats) => {
    if (err) {
      return handle404(ctx)
    }

    if (stats.isDirectory()) {
      return ResDir(ctx)
    }

    if (stats.isFile()) {
      return ResVerify(ctx, stats)
    }
  })
}