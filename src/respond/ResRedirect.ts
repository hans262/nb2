import { Context } from '../Interface/Context.js';
import { DEBUG } from '../modules/logger.js';

/**
 * 重定向 301永久/302临时
 * @param redirect 
 */
export function ResRedirect(redirect: Redirect) {
  const { ctx, location, code, reasonPhrase } = redirect
  const { absolutePath, res } = ctx
  res.setHeader('Location', location)
  res.writeHead(code, reasonPhrase)
  res.end()
  DEBUG({ type: 'REDIRECT', msg: absolutePath! + ' -> ' + location })
}

export interface Redirect {
  ctx: Context
  location: string
  code: number
  reasonPhrase: string
}
