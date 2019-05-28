import { extname } from 'path'

/**
 * 获取mime类型
 * @param path 
 */
export function mime(path: string): string {
  let ext = extname(path).slice(1)
  const type: string = MIME_TYPES[ext]
  return type ? type : MIME_TYPES['unknown']
}

const MIME_TYPES: any = {
  "css": "text/css",
  "gif": "image/gif",
  "html": "text/html",
  "ico": "image/x-icon",
  "jpeg": "image/jpeg",
  "jpg": "image/jpeg",
  "js": "application/javascript",
  "json": "application/json",
  "pdf": "application/pdf",
  "png": "image/png",
  "svg": "svg+xml",
  "swf": "application/x-shockwave-flash",
  "tiff": "image/tiff",
  "txt": "text/plain",
  "wav": "audio/x-wav",
  "wma": "audio/x-ms-wma",
  "wmv": "video/x-ms-wmv",
  "xml": "text/xml",
  "unknown": "application/octet-stream"
}