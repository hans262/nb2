"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("http");
const conf_1 = require("../conf");
const middleware_1 = require("../middleware");
const logger_1 = require("../modules/logger");
function HANDLER(req, res) {
    let i = 0;
    function next() {
        const middleware = middleware_1.default[i++];
        if (!middleware)
            return;
        middleware(req, res, next);
    }
    next();
}
function RUN() {
    const server = http_1.createServer(HANDLER);
    server.listen(conf_1.PORT, conf_1.HOST, () => {
        logger_1.DEBUG({ type: 'WORKER_STARTUP', msg: `port: ${conf_1.PORT}` });
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
exports.RUN = RUN;
//# sourceMappingURL=Worker.js.map