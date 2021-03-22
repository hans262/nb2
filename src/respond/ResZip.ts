import { createReadStream, ReadStream } from 'fs';
import { DEBUG } from '../modules/logger';
import { ZIP_TYPE } from '../common/zip';
import { createGzip, createDeflate, Gzip, Deflate } from 'zlib';
import { Context } from '../Interface/Context';

export function ResZip(ctx: Context, zipType: ZIP_TYPE) {
  const { absolutePath, startTime, res } = ctx
  //数据需要压缩，分块传输，所以无法得知数据体的真实大小
  //所有要删除Content-Length属性
  res.setHeader('Transfer-Encoding', 'chunked')
  res.removeHeader('Content-Length')

  const stream: ReadStream = createReadStream(absolutePath!)
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
  DEBUG({ 
    type: 'RES_ZIP', 
    msg: absolutePath! + ' +' + (Date.now() - startTime!) + 'ms'
  })
}