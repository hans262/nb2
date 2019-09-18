"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const styles = {
    'underline': '\x1B[4m',
    'inverse': '\x1B[7m',
    'black': '\x1B[30m',
    'blue': '\x1B[34m',
    'cyan': '\x1B[36m',
    'green': '\x1B[32m',
    'magenta': '\x1B[35m',
    'red': '\x1B[31m',
    'yellow': '\x1B[33m',
    'reset': '\x1B[0m'
};
class Stdout {
    static writeLine(mq, color) {
        color ?
            process.stdout.write(styles[color] + mq + styles['reset'] + '\r\n') :
            process.stdout.write(mq + '\r\n');
    }
    static info(mq) {
        this.writeLine(mq);
    }
    static success(mq) {
        this.writeLine(mq, 'green');
    }
    static error(mq) {
        this.writeLine(mq, 'red');
    }
    static warn(mq) {
        this.writeLine(mq, 'yellow');
    }
    static color(mq, color) {
        this.writeLine(mq, color);
    }
    static debug(type, mq) {
        switch (type) {
            case 'ERROR':
                return this.error(mq);
            case 'RES_404':
            case 'RES_416':
            case 'REDIRECT':
            case 'WORKET_EXIT':
                return this.warn(mq);
            case 'MASTER_STARTUP':
            case 'WORKER_STARTUP':
                return this.success(mq);
            default:
                this.info(mq);
        }
    }
}
exports.Stdout = Stdout;
//# sourceMappingURL=stdout.js.map