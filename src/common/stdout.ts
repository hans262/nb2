import { MessageType } from "../Interface/Message";
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
} as const
type Color = keyof typeof styles

/**
 * log stdout
 */
export class Stdout {
  static info(mq: string) {
    console.log(mq)
  }
  static success(mq: string) {
    console.log(styles['green'] + '%s' + '\x1B[0m', mq)
  }
  static error(mq: string) {
    console.log(styles['red'] + '%s' + '\x1B[0m', mq)
  }
  static warn(mq: string) {
    console.log(styles['yellow'] + '%s' + '\x1B[0m', mq)
  }
  static color(color: Color, mq: string) {
    console.log(styles[color] + '%s' + '\x1B[0m', mq)
  }
  static debug(type: MessageType, mq: string) {
    switch (type) {
      case 'ERROR':
        return this.error(mq)
      case 'RES_404':
      case 'RES_416':
      case 'REDIRECT':
      case 'WORKET_EXIT':
        return this.warn(mq)
      case 'MASTER_STARTUP':
      case 'WORKER_STARTUP':
        return this.success(mq)
      default:
        this.info(mq)
    }
  }
}