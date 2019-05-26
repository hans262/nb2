import { LOG } from '../utils/log'
interface Redirect {
  location: string
  code: number
  reasonPhrase: string
}
export default function ResRedirect(res: any, redirect: Redirect) {
  const { location, code, reasonPhrase } = redirect
  LOG({ type: 'REDIRECT', pid: process.pid, msg: location })
  res.setHeader('Location', location)
  res.writeHead(code, reasonPhrase)
  res.end()
}

/**
 * 301永久
 * 302临时性
 */