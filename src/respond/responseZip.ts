import { createReadStream, ReadStream } from 'node:fs';
import { stdlog } from '../common/logger.js';
import { createGzip, createDeflate, Gzip, Deflate } from 'node:zlib';
import { Context } from '../interface/Context.js';
import { ZipType } from './responseVerify.js';

export function responseZip(ctx: Context, zipType: ZipType) {
  const { staticPath, startTime, res } = ctx
  //数据需要压缩，分块传输，所以无法得知数据体的真实大小
  //所有要删除Content-Length属性
  res.setHeader('Transfer-Encoding', 'chunked')
  res.removeHeader('Content-Length')

  const stream: ReadStream = createReadStream(staticPath)
  let zipstream: Gzip | Deflate;

  if (zipType === 'GZIP') {
    res.setHeader('Content-Encoding', 'gzip')
    zipstream = createGzip()
  } else {
    res.setHeader('Content-Encoding', 'deflate')
    zipstream = createDeflate()
  }
  res.writeHead(200, 'Compressed file')
  stream.pipe(zipstream).pipe(res)
  stdlog({
    type: 'zip',
    msg: staticPath + ' +' + (Date.now() - startTime) + 'ms'
  })
}