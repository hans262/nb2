import { ServerResponse } from 'http';
import { Req } from '../Interface/Req';
import { LOG } from '../modules/log';

export function ResCache(req: Req, res: ServerResponse): void {
  const { __absolutePath } = req
  res.writeHead(304, 'Not Modified')
  res.end('Not Modified')
  LOG({ type: 'RES_CACHE', msg: __absolutePath! })
}