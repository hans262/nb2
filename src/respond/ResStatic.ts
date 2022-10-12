import { stat } from 'node:fs';
import { Context } from '../interface/Context.js';
import { ResDir } from './ResDir.js';
import { Res404 } from './Res404.js';
import { ResVerify } from './ResVerify.js';

export function ResStatic(ctx: Context) {
  stat(ctx.absolutePath, (err, stats) => {
    if (err) {
      return Res404(ctx)
    }

    if (stats.isDirectory()) {
      return ResDir(ctx)
    }

    if (stats.isFile()) {
      return ResVerify(ctx, stats)
    }
  })
}