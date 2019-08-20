import { ServerResponse } from 'http';
import { join } from 'path';
import { parse } from 'url';
import { ROOT } from '../configure';
import { Middleware } from '../Interface/Middleware';
import { Req } from '../Interface/Req';
import { public_header } from '../common/public_header';

export const Mount: Middleware = function (
  req: Req, res: ServerResponse, next: Function
): void {
  const { url = '/' } = req
  const { pathname = '/', query } = parse(url, true)
  //相对路径
  req.__relativePath = decodeURI(pathname)
  //绝对路径
  req.__absolutePath = decodeURI(join(ROOT, req.__relativePath))
  //查询字符串
  req.__query = query
  //公共header
  public_header(res)

  next()
}