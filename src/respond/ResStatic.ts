import { stat } from 'fs';
import { REACT_APP } from '../configure';
import { Context } from '../Interface/Context';
import { ResDir } from './ResDir';
import { ResIndex } from './ResIndex';
import { ResNotFound } from './ResNotFound';
import { ResVerify } from './ResVerify';

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