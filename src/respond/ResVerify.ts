import { CACHE_MAX_AGE } from '../configure';
import { Context } from '../Interface/Context';
import { generateETag, isCache } from '../common/cache';
import { mime } from '../common/mime';
import { getZipType, ZIP_TYPE } from '../common/zip';
import { ResCache } from './ResCache';
import { ResFile } from './ResFile';
import { ResRange } from './ResRange';
import { ResZip } from './ResZip';

export function ResVerify(ctx: Context) {
  const { absolutePath, stats, res, req } = ctx
  const { size, mtime } = stats!

  //判断缓存
  if (isCache(req, stats!)) return ResCache(ctx)

  //文件最后修改时间
  res.setHeader('Last-Modified', mtime.toUTCString())
  //到期时间，单位秒
  const expire: string = (new Date(Date.now() + CACHE_MAX_AGE * 1000)).toUTCString()
  res.setHeader('Expires', expire)
  //实现缓存机制
  res.setHeader('Cache-Control', `public, max-age=${CACHE_MAX_AGE}`)
  //资源关联记号
  res.setHeader('ETag', generateETag(stats!))

  //mime类型
  res.setHeader('Content-Type', mime(absolutePath!) + '; charset=utf-8')
  //内容大小
  res.setHeader('Content-Length', size)

  //范围请求
  if (req.headers['range']) return ResRange(ctx)

  const zipType: ZIP_TYPE | null = getZipType(ctx)
  //不是压缩
  if (!zipType) {
    return ResFile(ctx)
  }

  //需要压缩
  ResZip(ctx, zipType)
}
