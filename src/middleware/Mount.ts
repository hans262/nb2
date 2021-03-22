import { join } from 'path';
import { parse } from 'url';
import { ROOT } from '../configure';
import { Middleware } from '../Interface/Middleware';
import { public_header } from '../common/public_header';

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