import { ServerResponse } from 'http';
import { CACHE_MAX_AGE } from '../conf';
import { Req } from '../Interface/Req';
import { generateETag, isCache } from '../utils/cache';
import { mime } from '../utils/mime';
import ResCache from './ResCache';
import ResRange from './ResRange';
import ResZip from './ResZip';

export default function ResFile(req: Req, res: ServerResponse): void {
  const { absolutePath, stats } = req
  const { size, mtime } = stats

  //判断缓存
  if (isCache(req)) {
    return ResCache(req, res)
  }

  //文件最后修改时间
  res.setHeader('Last-Modified', mtime.toUTCString())
  //到期时间，单位秒
  const expire: string = (new Date(Date.now() + CACHE_MAX_AGE * 1000)).toUTCString()
  res.setHeader('Expires', expire)
  //实现缓存机制
  res.setHeader('Cache-Control', `public, max-age=${CACHE_MAX_AGE}`)
  //资源关联记号
  res.setHeader('ETag', generateETag(stats))

  //mime类型
  res.setHeader('Content-Type', mime(absolutePath) + '; charset=utf-8')
  //内容大小
  res.setHeader('Content-Length', size)

  if (req.headers['range']) {
    //范围请求
    ResRange(req, res)
  } else {
    //不是范围请求
    ResZip(req, res)
  }
}