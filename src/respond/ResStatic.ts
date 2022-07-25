import { stat } from 'node:fs';
import { REACT_APP } from '../configure/index.js';
import { Context } from '../Interface/Context.js';
import { ResDir } from './ResDir.js';
import { ResIndex } from './ResIndex.js';
import { ResNotFound } from './ResNotFound.js';
import { ResVerify } from './ResVerify.js';

export function ResStatic(ctx: Context) {
  const { absolutePath } = ctx
  stat(absolutePath!, (err, stats) => {
    if (err) {
      return REACT_APP ? ResIndex(ctx) : ResNotFound(ctx)
    }
    ctx.setStats(stats)

    if (stats.isDirectory()) {
      return ResDir(ctx)
    }

    if (stats.isFile()) {
      return ResVerify(ctx)
    }
  })
}