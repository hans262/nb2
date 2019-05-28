import { stat, Stats } from 'fs';
import { ServerResponse } from 'http';
import { Req } from '../Interface/Req';
import ResDir from '../respond/ResDir';
import ResFile from '../respond/ResFile';
import ResNotFound from '../respond/ResNotFound';

export default function ResStatic(req: Req, res: ServerResponse, next: Function): void {
  const { absolutePath } = req
  stat(absolutePath, (err: NodeJS.ErrnoException, stats: Stats) => {
    if (err) {
      return ResNotFound(req, res)
    }

    req.stats = stats

    if (stats.isDirectory()) {
      return ResDir(req, res)
    }

    if (stats.isFile()) {
      return ResFile(req, res)
    }
  })
}