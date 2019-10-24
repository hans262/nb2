"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("http");
class M1 {
    constructor(next) {
        this.next = next;
    }
    run(req, res) {
        res.write('1');
        this.next.run(req, res);
    }
}
class M2 {
    constructor(next) {
        this.next = next;
    }
    run(req, res) {
        res.write('2');
        this.next.run(req, res);
    }
}
class M3 {
    constructor() { }
    run(req, res) {
        res.write('3');
        res.end();
    }
}
const midList = new M1(new M2(new M3()));
class App {
    constructor() {
        this.server = http_1.createServer(this.handle);
    }
    handle(req, res) {
        try {
            midList.run(req, res);
        }
        catch (err) {
            res.writeHead(500, { 'Content-Type': 'application/json; charset=utf-8' });
            res.end('500 服务器错误 ' + err.message);
        }
    }
    listen(port) {
        this.server.listen(port);
    }
}
const app = new App();
app.listen(5555);
//# sourceMappingURL=ListMiddleware.js.map