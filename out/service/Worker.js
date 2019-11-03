"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("http");
const configure_1 = require("../configure");
const middleware_1 = require("../middleware");
const logger_1 = require("../modules/logger");
function HANDLER(req, res) {
    try {
        let i = 0;
        const next = () => {
            const middleware = middleware_1.default[i++];
            if (!middleware)
                return;
            middleware(req, res, next);
        };
        next();
    }
    catch (err) {
        res.end('500 服务器错误' + err.message);
        logger_1.DEBUG({ type: 'ERROR', msg: err.message });
    }
}
function RUN_WORKER() {
    const server = http_1.createServer(HANDLER);
    server.listen(configure_1.PORT, configure_1.HOST, () => {
        logger_1.DEBUG({ type: 'WORKER_STARTUP', msg: `port: ${configure_1.PORT}` });
    });
    process.on('message', action => {
        switch (action.type) {
            case 'CLOSE_SERVER':
                const { code } = action;
                server.close();
                setTimeout(() => {
                    process.exit(code);
                }, 10000);
                break;
            default:
                throw new Error('No MsgType!');
        }
    });
}
exports.RUN_WORKER = RUN_WORKER;
//# sourceMappingURL=Worker.js.map