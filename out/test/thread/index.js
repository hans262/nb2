"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const worker_threads_1 = require("worker_threads");
const task = (num) => new Promise((resolve, reject) => {
    const worker = new worker_threads_1.Worker(__dirname + '/worker.js', {
        workerData: num
    });
    worker.on('message', resolve);
    worker.on('error', reject);
    worker.on('exit', (code) => {
        if (code !== 0)
            reject(new Error(`Worker stopped with exit code ${code}`));
    });
});
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