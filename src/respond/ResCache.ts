import { ServerResponse } from 'http';
import { Req } from '../Interface/Req';
import { LOG } from '../modules/log';

export default function ResCache(req: Req, res: ServerResponse): void {
  const { absolutePath } = req
  LOG({ type: 'RES_CACHE', msg: absolutePath })
  res.writeHead(304, 'Not Modified')
  res.end('Not Modified')
}