"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const path_1 = require("path");
const zlib_1 = require("zlib");
const path_2 = require("../utils/path");
const gzip = zlib_1.createGzip();
const inp = fs_1.createReadStream(path_1.join(path_2.PUBLIC_PATH, 'input.txt'));
const out = fs_1.createWriteStream(path_1.join(path_2.PUBLIC_PATH, 'input.txt.gz'));
inp.pipe(gzip).pipe(out);
//# sourceMappingURL=zipFile.js.map