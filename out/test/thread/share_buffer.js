"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const worker_threads_1 = require("worker_threads");
if (worker_threads_1.isMainThread) {
    const sab = new SharedArrayBuffer(20);
    const iv = new Uint8Array(sab);
    for (let i = 0; i < 2; i++) {
        let worker = new worker_threads_1.Worker(__filename);
        worker.postMessage(sab);
        worker.on('message', () => {
            console.log(iv);
        });
    }
}
else {
    worker_threads_1.parentPort.once('message', (msg) => {
        const iv = new Uint8Array(msg);
        iv[worker_threads_1.threadId] = worker_threads_1.threadId;
        worker_threads_1.parentPort.postMessage('done');
    });
}
//# sourceMappingURL=share_buffer.js.map