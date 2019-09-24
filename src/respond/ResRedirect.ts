import { ServerResponse } from 'http';
import { DEBUG } from '../modules/logger';
import { Req } from '../Interface/Req';

/**
 * 重定向 301永久/302临时
 * @param redirect 
 */
export function ResRedirect(redirect: Redirect): void {
  const { res, location, code, reasonPhrase, req } = redirect
  const { __absolutePath } = req
  res.setHeader('Location', location)
  res.writeHead(code, reasonPhrase)
  res.end()
  DEBUG({ type: 'REDIRECT', msg: __absolutePath! + ' -> ' + location })
}

export interface Redirect {
  req: Req
  res: ServerResponse
  location: string
  code: number
  reasonPhrase: string
}
