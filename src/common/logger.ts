import { createWriteStream, existsSync, mkdirSync, WriteStream } from 'node:fs';
import { join } from 'node:path';

/**日志写入流 */
let WriteSteamOfLog: WriteStream | null = null;
/**当前日期 */
let CurrentDay: string;

/**
 * 创建写入流
 * @returns 
 */
function createStreamOfLog(logPath: string) {
  CurrentDay = new Date().toLocaleDateString().replace(/\//g, '-')
  const fileName = join(logPath, `/${CurrentDay}.log`)
  //检测目录是否存在
  if (!existsSync(logPath)) {
    try {
      mkdirSync(logPath)
    } catch (error) {
      throw new Error('创建日志目录失败，请检查原因')
    }
  }
  return createWriteStream(fileName, { flags: 'a' })
}

/**
 * 写入日志到文件
 * @param data 
 */
function writeLineOfLog(mq: string, logPath: string): void {
  //检查流是否存在
  if (!WriteSteamOfLog) {
    WriteSteamOfLog = createStreamOfLog(logPath)
  }
  //检查当前时间是否过期，第二天的日志
  //过了12点再写日志，需要重新创建写入流
  const newDay = new Date().toLocaleDateString().replace(/\//g, '-')
  if (newDay !== CurrentDay) {
    WriteSteamOfLog.close()
    WriteSteamOfLog = createStreamOfLog(logPath)
  }
  WriteSteamOfLog.write(mq + '\r\n')
}

/**
 * 输出日志
 * @param massage 
 */
export function stdlog(opt: {
  type: string
  msg?: string
  startTime?: number
  color?: keyof typeof defaultStyles
  logPath?: string
}) {
  //执行微任务，不影响主要程序的任务性能
  process.nextTick(() => {
    const { type, msg, color, logPath } = opt
    const date = new Date().toLocaleString()
    const mq = `[${date}] [${process.pid}] [${type}]${msg ? ' -> ' + msg : ''}`
    prettyLog(mq, color, 'std')
    if (logPath) {
      writeLineOfLog(mq, logPath)
    }
  })
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
 * 默认日志颜色
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
