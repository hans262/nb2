import { ServerResponse } from 'http';
import { Req } from '../Interface/Req';
import { DEBUG } from '../modules/logger';

export function ResCache(req: Req, res: ServerResponse): void {
  const { __absolutePath } = req
  res.writeHead(304, 'Not Modified')
  res.end('Not Modified')
  DEBUG({ type: 'RES_CACHE', msg: __absolutePath! })
}