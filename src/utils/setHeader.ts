import { ServerResponse } from 'http';
import { CROSS } from '../conf';

/**
 * 常用header
 * @param res 
 */
export default function setHeader(res: ServerResponse): void {
  //服务器类型
  res.setHeader('Server', 'NodeJs Server/1.0 (Linux)')
  //语言
  res.setHeader('Content-language', 'zh-CN, en-US')
  //决定未来的一个请求头，应该用一个缓存的回复(response)还是向源服务器请求一个新的回复。
  res.setHeader('Vary', 'Accept-Encoding, User-Agent')
  //xss安全策略
  res.setHeader('X-XSS-Protection', '1; mode=block')
  //表示自己支持范围请求
  res.setHeader('Accept-Ranges', 'bytes')
  //决定当前的事务完成后，是否会关闭网络连接
  res.setHeader('Connection', 'keep-alive')
  //跨域
  if (CROSS) {
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
    res.setHeader('Access-Control-Allow-Origin', '*')
  }
}