import { ServerResponse } from 'http';
import { CACHE_MAX_AGE } from '../conf';
import { Req } from '../Interface/Req';
import { generateETag, isCache } from '../utils/cache';
import { mime } from '../utils/mime';
import { isZip } from '../utils/zip';
import { ResCache } from './ResCache';
import { ResFile } from './ResFile';
import { ResRange } from './ResRange';
import { ResZip } from './ResZip';

export function ResVerify(req: Req, res: ServerResponse): void {
  const { __absolutePath, __stats } = req
  const { size, mtime } = __stats!

  //判断缓存
  if (isCache(req)) return ResCache(req, res)

  //文件最后修改时间
  res.setHeader('Last-Modified', mtime.toUTCString())
  //到期时间，单位秒
  const expire: string = (new Date(Date.now() + CACHE_MAX_AGE * 1000)).toUTCString()
  res.setHeader('Expires', expire)
  //实现缓存机制
  res.setHeader('Cache-Control', `public, max-age=${CACHE_MAX_AGE}`)
  //资源关联记号
  res.setHeader('ETag', generateETag(__stats!))

  //mime类型
  res.setHeader('Content-Type', mime(__absolutePath!) + '; charset=utf-8')
  //内容大小
  res.setHeader('Content-Length', size)

  //范围请求
  if (req.headers['range']) return ResRange(req, res)

  //不是压缩
  if (!isZip(req, res)) {
    return ResFile(req, res)
  }
  //需要压缩
  ResZip(req, res)
}
