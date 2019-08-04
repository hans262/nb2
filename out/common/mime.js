"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
function mime(path) {
    let ext = path_1.extname(path).slice(1);
    const type = MIME_TYPES[ext];
    return type ? type : MIME_TYPES['txt'];
}
exports.mime = mime;
const MIME_TYPES = {
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
};
//# sourceMappingURL=mime.js.map