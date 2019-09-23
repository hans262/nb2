"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const worker_threads_1 = require("worker_threads");
if (worker_threads_1.isMainThread) {
    const sab = new SharedArrayBuffer(20);
    const iv = new Int32Array(sab);
    iv[0] = 20;
    for (let i = 0; i < 2; i++) {
        let worker = new worker_threads_1.Worker(__filename);
        worker.postMessage(sab);
        worker.on('message', data => {
            console.log(data);
        });
    }
}
else {
    worker_threads_1.parentPort.once('message', (msg) => {
        const iv = new Int32Array(msg);
        let cur;
        while ((cur = Atomics.load(iv, 0)) > 0 && cur <= 20) {
            console.log(`threadId ${worker_threads_1.threadId} = ${iv[0]}`);
            Atomics.store(iv, 0, cur - 1);
        }
        worker_threads_1.parentPort.postMessage(`threadId ${worker_threads_1.threadId}, done`);
    });
}
//# sourceMappingURL=index.js.map