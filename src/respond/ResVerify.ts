import { CACHE_MAX_AGE } from '../configure/index.js';
import { Context } from '../interface/Context.js';
import { generateETag, isCache } from '../common/cache.js';
import { mime } from '../common/mime.js';
import { getZipType, ZIP_TYPE } from '../common/zip.js';
import { ResCache } from './ResCache.js';
import { ResFile } from './ResFile.js';
import { ResRange } from './ResRange.js';
import { ResZip } from './ResZip.js';
import { Stats } from 'node:fs';

export function ResVerify(ctx: Context, stats: Stats) {
  const { absolutePath, res, req } = ctx
  /**
   * 实际应用中的缓存策略
   * 更改频繁的文件，采取协商缓存，Cache-Control: no-cache
   * 基本不变化的资源，采取强制缓存 Cache-Control: max-age=xxx
   * Cache-Control 强制缓存
   * ETag 协商缓存
   */
  res.setHeader('Cache-Control', `max-age=${CACHE_MAX_AGE}`)
  res.setHeader('ETag', generateETag(stats))

  //判断缓存
  if (isCache(req, stats)) return ResCache(ctx)

  //mime类型
  res.setHeader('Content-Type', mime(absolutePath) + '; charset=utf-8')
  //内容大小
  res.setHeader('Content-Length', stats.size)

  //支持范围请求，请求一个文件的一部分
  if (req.headers['range']) return ResRange(ctx, stats)

  const zipType: ZIP_TYPE | null = getZipType(ctx)
  //不是压缩
  if (!zipType) {
    return ResFile(ctx)
  }

  //需要压缩
  ResZip(ctx, zipType)
}
