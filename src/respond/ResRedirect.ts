import { ServerResponse } from 'http';
import { LOG } from '../modules/log';

/**
 * 重定向 301永久/302临时
 * @param redirect 
 */
export function ResRedirect(redirect: Redirect): void {
  const { res, location, code, reasonPhrase } = redirect
  res.setHeader('Location', location)
  res.writeHead(code, reasonPhrase)
  res.end()
  LOG({ type: 'REDIRECT', msg: location })
}

interface Redirect {
  res: ServerResponse
  location: string
  code: number
  reasonPhrase: string
}
