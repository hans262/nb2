"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const worker_threads_1 = require("worker_threads");
const task = (num) => new Promise((resolve, reject) => {
    const worker = new worker_threads_1.Worker(__dirname + '/compute_fibonacci.js', {
        workerData: num
    });
    worker.once('message', resolve);
    worker.on('error', reject);
    worker.on('exit', (code) => {
        if (code !== 0)
            reject(new Error(`Worker stopped with exit code ${code}`));
    });
});
function test(nums = [40, 41]) {
    console.time('timer');
    Promise.all(nums.map(n => task(n))).then(ret => {
        console.log(`fib ${nums} = ${ret}`);
        console.timeEnd('timer');
    });
}
exports.test = test;
//# sourceMappingURL=fibonacci.js.map