import { LOG } from '../modules/log'

export default function ResCache(req: any, res: any) {
  const { absolutePath } = req
  LOG({ type: 'RES_CACHE', msg: absolutePath })
  res.writeHead(304, 'Not Modified')
  res.end('Not Modified')
}