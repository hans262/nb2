import * as http from 'node:http';
import * as https from 'node:https'
import { Method } from './context.js';

export interface Request {
  method?: Method
  body?: string | Buffer
}

export interface Response {
  statusCode?: number
  data: Buffer
}

/**
 * 网络请求 请求
 * @param opt
 */
export function fetchOn(_url: string, opt?: Request) {
  const url = new URL(_url)
  const rejectUnauthorized = url.protocol === 'https:' && (url.hostname === '127.0.0.1' ||
    url.hostname === 'localhost' || url.hostname === '0.0.0.0') ? false : true

  return new Promise<Response>((resolve, reject) => {
    const request = url.protocol === 'https:' ? https.request : http.request;
    const req = request({
      path: url.pathname + url.search,
      hostname: url.hostname,
      port: url.port,
      method: opt?.method ?? 'GET',
      rejectUnauthorized //拒绝本地自签名证书的校验
    }, ret => {
      const chunks: Buffer[] = []
      req.on('data', (chunk: Buffer) => {
        chunks.push(chunk)
      })

      req.on('end', () => {
        const data = Buffer.concat(chunks)
        resolve({ statusCode: ret.statusCode, data })
      })
    })

    req.on('error', (err) => {
      reject(err)
    })

    if (opt?.method === 'POST' && opt.body) {
      req.write(opt.body)
    }

    req.end()
  })
}