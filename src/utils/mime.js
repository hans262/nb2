const path = require('path')

/**
 * 获取mime类型
 * @param {string} p 
 */
function mime(p) {
  let ext = path.extname(p).slice(1)
  const m = MIME_TYPES[ext]
  return m ? m : MIME_TYPES['txt']
}

const MIME_TYPES = {
  "css": "text/css",
  "gif": "image/gif",
  "html": "text/html",
  "ico": "image/x-icon",
  "jpeg": "image/jpeg",
  "jpg": "image/jpeg",
  "js": "text/javascript",
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
}
module.exports = {
  mime
}