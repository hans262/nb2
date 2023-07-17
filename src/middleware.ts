import { Context } from './common/context.js';
import { stdlog } from './common/logger.js';
import { extname, join } from "node:path";
import { Stats, stat } from 'node:fs';
import { getMimeType } from "./common/mime.js";
import { out404, outDir, outFile, outCache, outRange, outZip } from "./response.js";

/**
 * 中间件类型
 */
export type Middleware = (ctx: Context, next: () => void) => void

/**
 * 控制器中间件
 * @param ctx 
 * @param next 
 * @returns 
 */
export const handleController: Middleware = (ctx, next) => {
  const { req, pathname, startTime } = ctx

  if (!req.method || !pathname) return next()
  if (!isMethod(req.method)) return next()

  const controller = ctx.app.controllers.find(c => {
    const regExp = new RegExp(
      '^' + c.pathname.replaceAll('*', '([^\/]+)') + '$'
    )
    const def = pathname.match(regExp)
    return !!def
  })

  if (!controller) return next()
  let handle = controller[req.method]
  if (!handle) return next()
  handle.bind(controller)(ctx)

  stdlog({
    type: 'controller', color: 'green', logPath: ctx.opt.systemLogPath,
    msg: pathname + ' +' + (Date.now() - startTime) + 'ms'
  })
}

export interface Controller {
  readonly pathname: string
  GET?(ctx: Context): void
  POST?(ctx: Context): void
  PUT?(ctx: Context): void
  DELETE?(ctx: Context): void
}

export type Method = 'GET' | 'POST' | 'PUT' | 'DELETE'

export function isMethod(m: string): m is Method {
  return ['GET', 'POST', 'PUT', 'DELETE'].includes(m)
}

/**
 * 静态资源中间件
 * @param ctx 
 * @param next 
 */
export const handleStatic: Middleware = (ctx, next) => {
  //没有资源目录，迅速跳掉下一个中间件
  if (!ctx.opt.staticRoot) {
    return next()
  }
  //拼接静态资源路径
  const staticPath = join(ctx.opt.staticRoot!, ctx.pathname)
  staticTask(ctx, staticPath)
}

/**
 * 响应静态资源
 * @param ctx 
 * @param staticPath 静态资源路径
 */
export function staticTask(ctx: Context, staticPath: string) {
  stat(staticPath, (err, stats) => {
    if (err) {
      return out404(ctx, { staticPath })
    }

    if (stats.isDirectory()) {
      return outDir(ctx, staticPath)
    }

    if (stats.isFile()) {
      const { res, req, opt } = ctx
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
      if (isHitEtagCache(ctx, stats)) return outCache(ctx, staticPath)

      //mime类型
      res.setHeader('Content-Type', getMimeType(staticPath) + '; charset=utf-8')

      //内容大小
      res.setHeader('Content-Length', stats.size)

      //支持范围请求，请求一个文件的一部分
      const range = req.headers['range']
      if (range) {
        return outRange(ctx, {
          size: stats.size, staticPath, range
        })
      }

      const encoding = isHitZipType(ctx, staticPath)
      //需要压缩
      if (encoding) {
        return outZip(ctx, staticPath, encoding)
      }

      return outFile(ctx, staticPath)
    }
  })
}

/**
 * 生成 ETags
 * @param stats
 */
export function generateETag(stats: Stats) {
  //文件最后修改时间的毫秒值，16进制
  const mtime: string = stats.mtimeMs.toString(16)
  const size: string = stats.size.toString(16)
  return `W/"${mtime}-${size}"`
}

/**
 * 校验当前资源是否命中etag缓存
 * @param ctx 
 * @param stats 当前资源
 */
export function isHitEtagCache(ctx: Context, stats: Stats) {
  const ifNoneMatch = ctx.req.headers['if-none-match'] //客户端ETag
  return ifNoneMatch === generateETag(stats)
}

/**
 * 是否命中压缩类型
 * @param ctx 
 * @param staticPath 
 */
export function isHitZipType(ctx: Context, staticPath: string) {
  const extName = extname(staticPath)
  //满足服务器设定的压缩文件范围
  if (!ctx.opt.canZipFile.includes(extName.slice(1))) {
    return false
  }

  //客户端支持的压缩类型
  const encoding = ctx.req.headers['accept-encoding']?.toString()
  if (!encoding) return false

  return encoding
}