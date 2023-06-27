import { Middleware } from '../../src/index.js';
import { CROSS } from '../constant.js';

export const mounted: Middleware = (ctx, next) => {
  const { res } = ctx
  
  //设置公共header

  //服务器相关信息
  res.setHeader('Server', 'NodeJs Server/1.0 (Linux)')

  /**
   * 决定下一个请求头，
   * 用一个缓存的response还是向服务器请求一个新的response。
   */
  res.setHeader('Vary', 'Accept-Encoding, User-Agent')

  //是否支持范围请求
  res.setHeader('Accept-Ranges', 'bytes')

  //服务器时间
  res.setHeader('Date', new Date().toUTCString())

  /**
   * 发起一个请求会创建一个tcp连接，会有握手环节
   * 决定浏览器是否会在下一个请求的时候，继续使用这个连接
   * timeout 空闲连接需要保持打开状态的最小时长
   * max 此连接可以发送的请求数的最大值
   * http/2 将忽略该值
   */
  res.setHeader('Connection', 'keep-alive')
  res.setHeader('Keep-Alive', 'timeout=5, max=1000')

  //跨域
  if (CROSS) {
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
    res.setHeader("Access-Control-Allow-Headers", '*')
    res.setHeader('Access-Control-Allow-Origin', '*')
  }

  /**
   * axios等请求库，发起跨域请求的时候，会多发送一个OPTIONS请求，
   * 用来检查服务器是否支持跨域，不返回任何内容即可
   */
  if (ctx.req.method === 'OPTIONS') return ctx.res.end()

  next()
}