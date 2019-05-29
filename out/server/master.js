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
const cluster_1 = require("cluster");
const os_1 = require("os");
const conf_1 = require("../conf");
const log_1 = require("../modules/log");
function master() {
    log_1.LOG({ type: 'MASTER STARTUP', msg: 'NodeServer version: 3.1.2' });
    conf_1.CLUSTER ? os_1.cpus().forEach(() => cluster_1.fork()) : cluster_1.fork();
    cluster_1.on('message', (worker, action) => {
        const { type } = action;
        switch (type) {
            case 'RE_START':
                //重启
                Object.values(cluster_1.workers).forEach((w, i) => {
                    setTimeout(() => {
                        w.send({ type: 'CLOSE_SERVER', code: 1 });
                    }, 2000 * i);
                });
                break;
            case 'SHUT_DOWN':
                //关机
                Object.values(cluster_1.workers).forEach((w) => {
                    w.send({ type: 'CLOSE_SERVER', code: 0 });
                });
                break;
            default:
                throw new Error('No MsgType!');
        }
    });
    cluster_1.on('exit', (worker, code) => {
        switch (code) {
            case 1:
                //重启
                log_1.LOG({ type: 'WORKET EXIT', pid: worker.process.pid, msg: 'restart' });
                return cluster_1.fork();
            case 0:
                //关机
                return log_1.LOG({ type: 'WORKET EXIT', pid: worker.process.pid, msg: 'shutdown' });
            default:
                throw new Error('process exception');
        }
    });
}
function RUN() {
    return __awaiter(this, void 0, void 0, function* () {
        if (cluster_1.isMaster) {
            master();
        }
        else {
            const { RUN } = yield Promise.resolve().then(() => require('./worker'));
            RUN();
        }
    });
}
exports.RUN = RUN;
//# sourceMappingURL=master.js.map