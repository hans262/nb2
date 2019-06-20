"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const multiparty_1 = require("multiparty");
exports.default = new class UpFile {
    constructor() {
        this.PATH = '/api/upfiles';
    }
    POST(req, res) {
        const form = new multiparty_1.Form();
        form.parse(req, (err, fields, files) => {
            console.log(files);
            res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
            res.end(JSON.stringify({ sucess: true, result: '上传成功' }));
        });
    }
};
//# sourceMappingURL=UpFiles.js.map