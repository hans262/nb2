import { join } from 'node:path';
import { parse } from 'node:url';
import { ROOT } from '../configure/index.js';
import { Middleware } from '../Interface/Middleware.js';
import { public_header } from '../common/public_header.js';

export const Mount: Middleware = (ctx, next) => {
  const { url = '/', method } = ctx.req

  //解析url
  const { pathname, query } = parse(url, true)
  //起始时间
  ctx.setStartTime(Date.now())
  //相对路径
  let relative = decodeURI(pathname ? pathname : '/')
  ctx.setRelativePath(relative)
  //绝对路径
  ctx.setAbsolutePath(decodeURI(join(ROOT, relative)))
  //查询字符串
  ctx.setQuery(query)
  //设置公共header
  public_header(ctx.res)

  //跨域查询请求，检查服务器是否支持跨域，不返回任何内容即可
  if (method === 'OPTIONS') return ctx.res.end()

  next()
}