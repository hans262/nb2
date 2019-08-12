"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const worker_threads_1 = require("worker_threads");
const task = (num) => {
    return new Promise((resolve) => {
        const worker = new worker_threads_1.Worker(__dirname + '/worker.js', {
            workerData: num
        });
        worker.on('message', data => {
            resolve(data);
        });
    });
};
function test() {
    const nums = [40, 41];
    const start = Date.now();
    Promise.all(nums.map(n => task(n))).then(ret => {
        const timer = Date.now() - start;
        console.log(`fib ${nums} = ${ret}`);
        console.log('timer = ' + timer + 'ms');
    });
}
exports.test = test;
//# sourceMappingURL=index.js.map