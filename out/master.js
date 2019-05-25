"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var cluster_1 = require("cluster");
var os_1 = require("os");
function master() {
    var nowTime = new Date().toLocaleString();
    console.info("[MASTER STARTUP] pid: " + process.pid + " date: " + nowTime);
    os_1.cpus().forEach(function () { return cluster_1.fork(); });
    cluster_1.on('message', function (worker, action) {
        switch (action.type) {
            case 'INFO':
                var pid = action.pid, msg = action.msg, msgtype = action.msgtype;
                var nowTime_1 = new Date().toLocaleString();
                console.info("[" + msgtype + "] pid: " + pid + " date: " + nowTime_1 + " -> " + msg);
                break;
            case 'RE_START':
                //重启
                Object.values(cluster_1.workers).forEach(function (w, i) {
                    setTimeout(function () {
                        w.send({ type: 'CLOSE_SERVER', code: 1 });
                    }, 2000 * i);
                });
                break;
            case 'SHUT_DOWN':
                //关机
                Object.values(cluster_1.workers).forEach(function (w) {
                    w.send({ type: 'CLOSE_SERVER', code: 0 });
                });
                break;
            default:
                throw new Error('No MsgType!');
        }
    });
    cluster_1.on('exit', function (worker, code) {
        var nowTime = new Date().toLocaleString();
        console.info("[WORKET EXIT] pid: " + worker.process.pid + " date: " + nowTime);
        if (code === 1) {
            //重启
            cluster_1.fork();
        }
    });
}
function RUN() {
    if (cluster_1.isMaster) {
        master();
    }
    else {
        console.log('执行子进程代码');
    }
}
exports.RUN = RUN;
//# sourceMappingURL=master.js.map