import { extname } from 'node:path'

/**
 * 获取mime类型
 * @param path 
 */
export function getMimeType(path: string) {
  const ext = extname(path).slice(1)
  if (isMime(ext)) {
    return MimeType[ext]
  } else {
    return MimeType['txt']
  }
}

/**
 * 把字符串断言到Mime类型
 * @param key 
 * @returns 
 */
function isMime(key: string): key is keyof typeof MimeType {
  return Object.keys(MimeType).includes(key)
}

export const MimeType = {
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
  "svg": "image/svg+xml",
  "swf": "application/x-shockwave-flash",
  "tiff": "image/tiff",
  "txt": "text/plain",
  "wav": "audio/x-wav",
  "wma": "audio/x-ms-wma",
  "wmv": "video/x-ms-wmv",
  "xml": "text/xml",
  "unknown": "application/octet-stream"
} as const