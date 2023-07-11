import { Dirent, createReadStream, existsSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { Deflate, Gzip, createDeflate, createGzip } from 'node:zlib';
import { Context } from "./common/context.js";
import { stdlog } from './common/logger.js';
import { staticTask } from './middleware.js';

/**
 * 响应文件
 * @param ctx 
 * @param staticPath 
 */
export function outFile(ctx: Context, staticPath: string) {
  const { startTime, res } = ctx
  const stream = createReadStream(staticPath)
  res.writeHead(200, 'Responed file')
  stream.pipe(res)
  stdlog({
    type: 'file', color: 'green', logPath: ctx.opt.systemLogPath,
    msg: staticPath + ' +' + (Date.now() - startTime) + 'ms'
  })
}

/**
 * 响应目录
 * @param ctx 
 * @param staticPath 
 */
export function outDir(ctx: Context, staticPath: string) {
  const { startTime, res, opt: { indexPageName } } = ctx
  let dirents: Array<Dirent>
  try {
    dirents = readdirSync(staticPath, {
      withFileTypes: true
    })
  } catch (error: any) {
    //证明该文件夹无法打开，可能存在权限等问题。
    res.setHeader('Content-Type', 'text/html; charset=utf-8')
    res.writeHead(200, 'Directory Fail')
    res.end(`
      <h1>目录 ${ctx.pathname}</h1>
      <p style="color:red;">目录访问失败：${error.message}</p>
    `)
    stdlog({
      type: 'dir_fail', color: 'red', logPath: ctx.opt.systemLogPath,
      msg: staticPath + ' +' + (Date.now() - startTime) + 'ms'
    })
    return
  }

  /**
   * 检查目录下index.html文件是否存在
   * 若存在则渲染该文件，需要重新拼接资源路径
   */
  if (dirents.find(d => d.name === indexPageName)) {
    return staticTask(ctx, join(staticPath, indexPageName!))
  }

  let content = `<h1>目录 ${ctx.pathname}</h1>`
  dirents.forEach(dirent => {
    let { name } = dirent
    let href = join(ctx.pathname, name)
    if (dirent.isDirectory()) {
      href += '/'
      name += '/'
    }
    content += `<p><a href="${href}">${name}</a></p>`
  })
  res.setHeader('Content-Type', 'text/html; charset=utf-8')
  res.writeHead(200, 'Directory Access')
  res.end(content)
  stdlog({
    type: 'dir', color: 'green', logPath: ctx.opt.systemLogPath,
    msg: staticPath + ' +' + (Date.now() - startTime) + 'ms'
  })
}

/**
 * 响应404
 * @param ctx 
 * @param opt 
 */
export const out404 = (ctx: Context, opt?: {
  staticPath?: string, reason?: string
}) => {
  const { startTime, res } = ctx
  const path = opt?.staticPath ?? ctx.pathname
  if (ctx.opt.frontRoute && ctx.opt.staticRoot) {
    /**
     * react/vue 的history路由模式
     * 是采用让前端处理路由，所以把404的所有内容返回到 root/index.html
     * 注意检查该文件是否存在，避免造成死循环
     * 这里拼接 root/index.html路径
     */
    const reactIndexPath = join(ctx.opt.staticRoot, ctx.opt.indexPageName!)
    if (existsSync(reactIndexPath)) {
      return staticTask(ctx, reactIndexPath)
    }
  }

  res.setHeader('Content-Type', 'text/html; charset=utf-8')
  res.writeHead(404, 'Not Found')
  res.end(`
  	<h1>404</h1>
  	<p>${path} ${opt?.reason ?? '当前路径不存在。'} </p>
  `)

  stdlog({
    type: '404', color: 'red', logPath: ctx.opt.systemLogPath,
    msg: path + ' +' + (Date.now() - startTime) + 'ms'
  })
}

/**
 * 响应缓存
 * @param ctx 
 * @param staticPath 
 */
export function outCache(ctx: Context, staticPath: string) {
  const { startTime, res } = ctx
  res.writeHead(304, 'Not Modified')
  res.end()
  stdlog({
    type: 'cache', color: 'cyan', logPath: ctx.opt.systemLogPath,
    msg: staticPath + ' +' + (Date.now() - startTime) + 'ms'
  })
}

/**
 * 响应范围文件
 * @param ctx 
 * @param opt 
 */
export function outRange(ctx: Context, opt: {
  size: number
  staticPath: string
  range: string
}) {
  const { startTime, res } = ctx
  //解析范围
  const range = parseRange(opt.range, opt.size)

  //判断范围是否存在
  if (range) {
    const { start, end } = range
    res.setHeader('Content-Range', `bytes=${start}-${end}/${opt.size}`)
    res.setHeader('Content-Length', (end - start + 1))
    const stream = createReadStream(opt.staticPath, { start, end })

    res.writeHead(206, 'Partial content')
    stream.pipe(res)
    stdlog({
      type: 'range', color: 'green', logPath: ctx.opt.systemLogPath,
      msg: opt.staticPath + ' +' + (Date.now() - startTime) + 'ms'
    })
  } else {
    res.removeHeader('Content-Length')
    res.setHeader('Content-Range', `bytes=*/${opt.size}`)
    res.writeHead(416, 'Out of range')
    res.end()
    stdlog({
      type: 'range_416', color: 'red', logPath: ctx.opt.systemLogPath,
      msg: opt.staticPath + ' +' + (Date.now() - startTime) + 'ms'
    })
  }
}

/**
 * 解析请求范围
 * 格式要求: Content-Range: bytes=start-end
 * 如果文件 bytelength=10 ， 全部范围: bytes=0-9 ， 
 * bytes=x-x 表示第x字节的内容
 * @param range 
 * @param size 文件大小
 */
export function parseRange(range: string, size: number): {
  start: number
  end: number
} | null {
  const matched = range.match(/^bytes=(\d+)-(\d+)$/)
  //格式不正确
  if (!matched) return null

  const start = parseInt(matched[1])
  const end = parseInt(matched[2])

  if (start >= 0 && start <= end && end < size) {
    //合理范围
    return { start, end }
  } else {
    //不存在的范围
    return null
  }
}

/**
 * 响应压缩文件
 * @param ctx 
 * @param staticPath 
 * @param encoding 
 * @returns 
 */
export function outZip(ctx: Context, staticPath: string, encoding: string) {
  const { startTime, res } = ctx

  let zipstream: Gzip | Deflate | null = null

  //满足服务器支持的压缩类型
  if (encoding.match(/\bgzip\b/)) {
    res.setHeader('Content-Encoding', 'gzip')
    zipstream = createGzip()
  }

  if (encoding.match(/\bdeflate\b/)) {
    res.setHeader('Content-Encoding', 'deflate')
    zipstream = createDeflate()
  }

  if (!zipstream) {
    return outFile(ctx, staticPath)
  }

  //数据需要压缩，分块传输，所以无法得知数据体的真实大小
  //所有要删除Content-Length属性
  res.setHeader('Transfer-Encoding', 'chunked')
  res.removeHeader('Content-Length')
  res.writeHead(200, 'Compressed file')

  const stream = createReadStream(staticPath)
  stream.pipe(zipstream).pipe(res)
  stdlog({
    type: 'zip', color: 'green', logPath: ctx.opt.systemLogPath,
    msg: staticPath + ' +' + (Date.now() - startTime) + 'ms'
  })
}

/**
 * 响应重定向 301永久/302临时
 * @param ctx 
 * @param redirect 
 */
export function outRedirect(ctx: Context, redirect: {
  location: string
  code: number
  reasonPhrase: string
}) {
  const { pathname, res } = ctx
  const { location, code, reasonPhrase } = redirect

  res.setHeader('Location', location)
  res.writeHead(code, reasonPhrase)
  res.end()
  stdlog({
    type: 'redirect', color: 'cyan', logPath: ctx.opt.systemLogPath,
    msg: pathname + ' -> ' + location
  })
}