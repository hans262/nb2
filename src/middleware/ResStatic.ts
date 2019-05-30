import { stat, Stats } from 'fs';
import { ServerResponse } from 'http';
import { REACT_APP } from '../conf';
import { Middleware } from '../Interface/Middleware';
import { Req } from '../Interface/Req';
import { ResDir } from '../respond/ResDir';
import { ResIndex } from '../respond/ResIndex';
import { ResNotFound } from '../respond/ResNotFound';
import { ResVerify } from '../respond/ResVerify';

export const ResStatic: Middleware = function (req: Req, res: ServerResponse, next: Function): void {
  const { __absolutePath } = req
  stat(__absolutePath, (err: NodeJS.ErrnoException, stats: Stats) => {
    if (err) {
      return REACT_APP ? ResIndex(req,res) : ResNotFound(req, res)
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