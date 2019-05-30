import { ServerResponse } from 'http';
import { Req } from '../Interface/Req';
import { LOG } from '../modules/log';

export function ResCache(req: Req, res: ServerResponse): void {
  const { __absolutePath } = req
  LOG({ type: 'RES_CACHE', msg: __absolutePath })
  res.writeHead(304, 'Not Modified')
  res.end('Not Modified')
}