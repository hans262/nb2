import { stat, Stats } from 'fs';
import { ServerResponse } from 'http';
import { Req } from '../Interface/Req';
import ResDir from '../respond/ResDir';
import ResVerify from '../respond/ResVerify';
import ResNotFound from '../respond/ResNotFound';

export default function ResStatic(req: Req, res: ServerResponse, next: Function): void {
  const { __absolutePath } = req
  stat(__absolutePath, (err: NodeJS.ErrnoException, stats: Stats) => {
    if (err) {
      return ResNotFound(req, res)
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