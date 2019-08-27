"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const worker_threads_1 = require("worker_threads");
if (worker_threads_1.isMainThread) {
    const sab = new SharedArrayBuffer(Int32Array.BYTES_PER_ELEMENT * 5);
    const ia = new Int32Array(sab);
    for (let i = 0; i < ia.length; i++) {
        ia[i] = i;
    }
    for (let i = 0; i < 2; i++) {
        let w = new worker_threads_1.Worker(__filename);
        w.postMessage(sab);
        w.on('message', () => {
            console.log(ia);
        });
    }
}
else {
    worker_threads_1.parentPort.once('message', (msg) => {
        const ia = new Int32Array(msg, 0, 1);
        ia[0] = ia[0] + 1;
        worker_threads_1.parentPort.postMessage('done');
    });
}
//# sourceMappingURL=index.js.map