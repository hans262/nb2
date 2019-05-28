import { ServerResponse } from 'http';
import { join } from 'path';
import { parse } from 'url';
import { ROOT } from '../conf';
import { Req } from '../Interface/Req';
import { LOG } from '../modules/log';
import setHeader from '../utils/setHeader';

export default function Mount(req: Req, res: ServerResponse, next: Function): void {
  const { pathname, query } = parse(req.url, true)
  //相对路径
  req.relativePath = decodeURI(pathname)
  //绝对路径
  req.absolutePath = decodeURI(join(ROOT, req.relativePath))
  //查询字符串
  req.query = query
  //常用header
  setHeader(res)

  LOG({ type: 'REQUEST', msg: req.absolutePath })

  next()
}