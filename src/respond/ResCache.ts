import { LOG } from '../modules/log'
import { Req } from '../Interface/Req';
import { ServerResponse } from 'http';

export default function ResCache(req: Req, res: ServerResponse): void {
  const { absolutePath } = req
  LOG({ type: 'RES_CACHE', msg: absolutePath })
  res.writeHead(304, 'Not Modified')
  res.end('Not Modified')
}