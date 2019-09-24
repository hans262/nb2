import { stat, Stats } from 'fs';
import { ServerResponse } from 'http';
import { REACT_APP } from '../configure';
import { Req } from '../Interface/Req';
import { ResDir } from './ResDir';
import { ResIndex } from './ResIndex';
import { ResNotFound } from './ResNotFound';
import { ResVerify } from './ResVerify';

export function ResStatic(req: Req, res: ServerResponse): void {
  const { __absolutePath } = req
  stat(__absolutePath!, (err: NodeJS.ErrnoException | null, stats: Stats) => {
    if (err) {
      return REACT_APP ? ResIndex(req, res) : ResNotFound(req, res)
    }

    req.__stats = stats

    if (stats.isDirectory()) {
      return ResDir(req, res)
    }

    if (stats.isFile()) {
      return ResVerify(req, res)
    }
  })
}