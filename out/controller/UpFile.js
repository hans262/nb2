"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const path_1 = require("path");
const path_2 = require("../utils/path");
exports.default = new class UpFile {
    constructor() {
        this.PATH = '/api/upfile';
    }
    POST(req, res) {
        const chunks = [];
        req.on('data', (chunk) => {
            chunks.push(chunk);
        });
        req.on('end', () => {
            const buffers = Buffer.concat(chunks);
            const rems = [];
            for (let i = 0; i < buffers.length; i++) {
                if (buffers[i] == 13 && buffers[i + 1] == 10) {
                    rems.push(i);
                }
            }
            console.log(rems);
            console.log('第一行');
            console.log(buffers.slice(0, rems[0]).toString());
            console.log('第二行');
            console.log(buffers.slice(rems[0] + 2, rems[1]).toString());
            console.log('第三行');
            console.log(buffers.slice(rems[1] + 2, rems[2]).toString());
            console.log('第四行');
            console.log(buffers.slice(rems[2] + 2, rems[3]).toString());
            const fileName = buffers.slice(rems[0] + 2, rems[1]).toString().match(/(?<=filename=")[^"]+(?=")/)[0];
            console.log('文件名: ' + fileName);
            const fileBuf = buffers.slice(rems[3] + 2, rems[rems.length - 2]);
            fs_1.writeFileSync(path_1.join(path_2.PUBLIC_PATH, fileName), fileBuf, 'utf8');
            res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
            res.end(JSON.stringify({ sucess: true, result: '上传成功' }));
        });
    }
};
//# sourceMappingURL=UpFile.js.map