"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cluster_1 = require("cluster");
const os_1 = require("os");
const configure_1 = require("../configure");
const logger_1 = require("../modules/logger");
function MASTER() {
    logger_1.DEBUG({ type: 'MASTER_STARTUP', msg: `Nicest version: 4.2.0` });
    configure_1.CLUSTER ? os_1.cpus().forEach(() => cluster_1.fork()) : cluster_1.fork();
    cluster_1.on('message', (worker, action) => {
        const { type } = action;
        switch (type) {
            case 'RE_START':
                Object.values(cluster_1.workers).forEach((w, i) => {
                    if (!w)
                        return;
                    setTimeout(() => {
                        w.send({ type: 'CLOSE_SERVER', code: 1 });
                    }, 2000 * i);
                });
                break;
            case 'SHUT_DOWN':
                Object.values(cluster_1.workers).forEach((w) => {
                    if (!w)
                        return;
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
                logger_1.DEBUG({ type: 'WORKET_EXIT', pid: worker.process.pid, msg: 'restart' });
                return cluster_1.fork();
            case 0:
                return logger_1.DEBUG({ type: 'WORKET_EXIT', pid: worker.process.pid, msg: 'shutdown' });
            default:
                throw new Error('process exception');
        }
    });
}
async function RUN_CLUSTER() {
    if (cluster_1.isMaster) {
        MASTER();
    }
    else {
        const { RUN_WORKER } = await Promise.resolve().then(() => require('./Worker'));
        RUN_WORKER();
    }
}
exports.RUN_CLUSTER = RUN_CLUSTER;
//# sourceMappingURL=Cluster.js.map