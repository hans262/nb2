"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("http");
const conf_1 = require("../conf");
const Main_1 = require("./Main");
const log_1 = require("../modules/log");
function RUN() {
    return __awaiter(this, void 0, void 0, function* () {
        const server = http_1.createServer(Main_1.HANDLER);
        server.listen(conf_1.PORT, conf_1.HOST, () => {
            log_1.LOG({ type: 'WORKER STARTUP', msg: `port: ${conf_1.PORT}` });
        });
        process.on('message', action => {
            switch (action.type) {
                case 'CLOSE_SERVER':
                    const { code } = action;
                    //平滑关闭server
                    server.close();
                    setTimeout(() => {
                        process.exit(code);
                    }, 10000);
                    break;
                default:
                    throw new Error('No MsgType!');
            }
        });
    });
}
exports.RUN = RUN;
//# sourceMappingURL=worker.js.map