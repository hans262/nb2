import { extname } from 'node:path'

/**
 * 获取mime类型
 * @param path 
 */
export function mime(path: string): string {
  const ext = extname(path).slice(1)
  if (isMime(ext)) {
    return MimeTypes[ext]
  } else {
    return MimeTypes['txt']
  }
}

function isMime(key: string): key is keyof typeof MimeTypes {
  return Object.keys(MimeTypes).includes(key)
}

export const MimeTypes = {
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