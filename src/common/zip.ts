import { extname } from 'path';
import { ZIP_MATCH } from '../configure';
import { Context } from "../Interface/Context";

/**
 * check zip
 * @param req 
 * @param res 
 */
export function getZipType(ctx: Context): ZIP_TYPE | null {
  const { absolutePath, req } = ctx
  const type: string = extname(absolutePath!)

  //检查是否在压缩范围
  const matched: RegExpMatchArray | null = type.match(ZIP_MATCH)
  if (!matched) return null

  //检查客户端支持的压缩类型
  let acceptEncoding: string | string[] | undefined = req.headers['accept-encoding']
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

export type ZIP_TYPE = 'GZIP' | 'DEFLATE'