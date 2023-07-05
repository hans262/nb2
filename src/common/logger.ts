import { createWriteStream, existsSync, mkdirSync, WriteStream } from 'node:fs';
import { join } from 'node:path';
import { LOGS_PATH } from './path.js';

/**日志写入流 */
let WriteSteamOfLog: WriteStream | null = null;
/**当前日期 */
let CURRENT_DAY: string;

/**
 * 创建写入流
 * @returns 
 */
function createStreamOfLog(): WriteStream {
  CURRENT_DAY = new Date().toLocaleDateString().replace(/\//g, '-')
  const fileName: string = join(LOGS_PATH, `/${CURRENT_DAY}.log`)
  //检测目录是否存在
  if (!existsSync(LOGS_PATH)) {
    try {
      mkdirSync(LOGS_PATH)
    } catch (error) {
      throw new Error('创建目录失败')
    }
  }
  return createWriteStream(fileName, { flags: 'a' })
}

/**
 * 写入日志到文件
 * @param data 
 */
function writeLineOfLog(mq: string): void {
  //检查流是否存在
  if (!WriteSteamOfLog) {
    WriteSteamOfLog = createStreamOfLog()
  }
  //检查当前时间是否过期
  const newDay: string = new Date().toLocaleDateString()
  if (newDay !== CURRENT_DAY) {
    WriteSteamOfLog.close()
    WriteSteamOfLog = createStreamOfLog()
  }
  WriteSteamOfLog.write(mq + '\r\n')
}

/**
 * 输出日志
 * @param massage 
 */
export function stdlog(massage: Message) {
  //执行微任务，不影响主要程序的任务性能
  process.nextTick(__stdlog, massage)
}

function __stdlog(massage: Message) {
  const { type, msg, color } = massage
  const date = new Date().toLocaleString()
  const mq = `[${date}] [${process.pid}] [${type}]${msg ? ' -> ' + msg : ''}`
  prettyLog(mq, color, 'std')
  writeLineOfLog(mq)
}

/**
 * 输出好看的日志
 * @param mq 消息内容
 * @param color 颜色
 * @param output 选择输出函数
 */
export function prettyLog(
  mq: string,
  color?: keyof typeof defaultStyles,
  output?: 'std' | 'console'
) {
  if (color) {
    mq = defaultStyles[color] + mq + defaultStyles['reset']
  }
  if (output === 'std') {
    process.stdout.write(mq + '\r\n')
  } else {
    console.log(mq)
  }
}

/**
 * 默认颜色
 */
const defaultStyles = {
  'red': '\x1B[31m',
  'green': '\x1B[32m',
  'blue': '\x1B[34m',
  'yellow': '\x1B[33m',
  'black': '\x1B[30m',
  'cyan': '\x1B[36m', //蓝绿
  'magenta': '\x1B[35m', //品红
  'underline': '\x1B[4m', //下划线
  'reset': '\x1B[0m', //重置颜色
} as const

export interface Message {
  type: string
  msg?: string
  startTime?: number
  color?: keyof typeof defaultStyles
}

/**
 * 向主进程发送消息
 */
// export function SEND(cmd: ACTION): void {
//   const { type } = cmd
//   //IPC 通道是否连接
//   console.log(process.connected, process.send)
//   if (process.connected) {
//     process.send!({ type })
//   } else {
//     console.log('worker进程无法处理命令')
//   }
// }