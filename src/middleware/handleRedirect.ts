import { Context } from '../interface/Context.js';
import { stdlog } from '../common/logger.js';

/**
 * 重定向 301永久/302临时
 * @param redirect 
 */
export function handleRedirect(redirect: Redirect) {
  const { ctx, location, code, reasonPhrase } = redirect
  const { staticPath, res } = ctx
  res.setHeader('Location', location)
  res.writeHead(code, reasonPhrase)
  res.end()
  stdlog({ type: 'redirect', msg: staticPath + ' -> ' + location })
}

export interface Redirect {
  ctx: Context
  location: string
  code: number
  reasonPhrase: string
}
