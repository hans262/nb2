"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cluster_1 = require("cluster");
const os_1 = require("os");
const conf_1 = require("../conf");
const packageConf_1 = require("../conf/packageConf");
const log_1 = require("../modules/log");
function master() {
    log_1.LOG({ type: 'MASTER STARTUP', msg: `NodeServer version: ${packageConf_1.default.version}` });
    conf_1.CLUSTER ? os_1.cpus().forEach(() => cluster_1.fork()) : cluster_1.fork();
    cluster_1.on('message', (worker, action) => {
        const { type } = action;
        switch (type) {
            case 'RE_START':
                Object.values(cluster_1.workers).forEach((w, i) => {
                    setTimeout(() => {
                        w.send({ type: 'CLOSE_SERVER', code: 1 });
                    }, 2000 * i);
                });
                break;
            case 'SHUT_DOWN':
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
                log_1.LOG({ type: 'WORKET EXIT', pid: worker.process.pid, msg: 'restart' });
                return cluster_1.fork();
            case 0:
                return log_1.LOG({ type: 'WORKET EXIT', pid: worker.process.pid, msg: 'shutdown' });
            default:
                throw new Error('process exception');
        }
    });
}
async function RUN() {
    if (cluster_1.isMaster) {
        master();
    }
    else {
        const { RUN } = await Promise.resolve().then(() => require('./worker'));
        RUN();
    }
}
exports.RUN = RUN;
//# sourceMappingURL=master.js.map