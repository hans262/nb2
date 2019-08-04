import { ServerResponse } from "http";
import { extname } from 'path';
import { createDeflate, createGzip } from 'zlib';
import { ZIP_MATCH } from '../configure';
import { Req } from "../Interface/Req";

/**
 * check zip
 * @param req 
 * @param res 
 */
export function isZip(req: Req, res: ServerResponse): boolean {
  const { __absolutePath } = req
  const type: string = extname(__absolutePath!)

  //检查是否在压缩范围
  const matched: RegExpMatchArray | null = type.match(ZIP_MATCH)
  if (!matched) return false

  //检查客户端支持的压缩类型
  let acceptEncoding: string | string[] | undefined = req.headers['accept-encoding']
  if (!acceptEncoding) return false

  const EncodeType: string = acceptEncoding.toString()

  if (EncodeType.match(/\bgzip\b/)) {
    res.setHeader('Content-Encoding', 'gzip')
    req.__zipstream = createGzip()
    return true
  }
  if (EncodeType.match(/\bdeflate\b/)) {
    res.setHeader('Content-Encoding', 'deflate')
    req.__zipstream = createDeflate()
    return true
  }
  return false
}