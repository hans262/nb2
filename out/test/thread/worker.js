"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const worker_threads_1 = require("worker_threads");
const fibonacci = (num) => {
    if (num <= 2) {
        return 1;
    }
    else {
        return fibonacci(num - 1) + fibonacci(num - 2);
    }
};
const number = worker_threads_1.workerData;
const ret = fibonacci(number);
if (worker_threads_1.parentPort) {
    worker_threads_1.parentPort.postMessage(ret);
}
//# sourceMappingURL=worker.js.map