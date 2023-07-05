import { Context } from '../interface/Context.js';
import { mime } from '../common/mime.js';
import { generateETag, isHitEtagCache, responseCache } from './responseCache.js';
import { responseFile } from './responseFile.js';
import { responseRange } from './responseRange.js';
import { responseZip } from './responseZip.js';
import { Stats } from 'node:fs';
import { extname } from 'node:path';

export function responseVerify(ctx: Context, stats: Stats) {
  const { staticPath, res, req, opt } = ctx
  /**
   * 实际应用中的缓存策略
   * 更改频繁的文件，采取协商缓存，Cache-Control: no-cache
   * 基本不变化的资源，采取强制缓存 Cache-Control: max-age=xxx
   * Cache-Control 强制缓存
   * ETag 协商缓存
   */
  res.setHeader('Cache-Control', `max-age=${opt.cacheMaxAge}`)
  res.setHeader('ETag', generateETag(stats))

  //判断缓存
  if (isHitEtagCache(ctx, stats)) return responseCache(ctx)

  //mime类型
  res.setHeader('Content-Type', mime(staticPath) + '; charset=utf-8')
  
  //内容大小
  res.setHeader('Content-Length', stats.size)

  //支持范围请求，请求一个文件的一部分
  if (req.headers['range']) return responseRange(ctx, stats)

  const zipType = getZipTypeOfClient(ctx)
  //不是压缩
  if (!zipType) {
    return responseFile(ctx)
  }

  //需要压缩
  responseZip(ctx, zipType)
}

/**压缩类型 */
export type ZipType = 'GZIP' | 'DEFLATE'

/**
 * 获取客户端支持的压缩类型
 * @param ctx
 */
export function getZipTypeOfClient(ctx: Context): ZipType | null {
  const { staticPath, req } = ctx
  const extName = extname(staticPath)
  //检查当前资源是否在服务区允许的压缩范围
  const matched = ctx.opt.staticZipRange?.includes(extName.slice(1))
  if (!matched) return null

  //检查客户端支持的压缩类型
  let acceptEncoding = req.headers['accept-encoding']
  if (!acceptEncoding) return null

  const EncodeType: string = acceptEncoding.toString()

  if (EncodeType.match(/\bgzip\b/)) {
    return 'GZIP'
  }
  if (EncodeType.match(/\bdeflate\b/)) {
    return 'DEFLATE'
  }
  return null
}