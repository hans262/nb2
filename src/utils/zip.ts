import { ServerResponse } from "http";
import { extname } from 'path';
import { createDeflate, createGzip } from 'zlib';
import { ZIP_MATCH } from '../conf';
import { Req } from "../Interface/Req";
/**
 * 检查压缩
 * @param req 
 * @param res 
 */
export function isZip(req: Req, res: ServerResponse): boolean {
  const { __absolutePath } = req
  const type: string = extname(__absolutePath)
  const matched: RegExpMatchArray = type.match(ZIP_MATCH)//压缩范围
  if (!matched) return false
  const EncodeType: string = req.headers['accept-encoding'].toString()
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