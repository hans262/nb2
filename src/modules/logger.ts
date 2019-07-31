import { createWriteStream, WriteStream } from 'fs';
import { join } from 'path';
import { LOGS_PATH } from '../utils/path';

let STREAM: WriteStream | null = null;
let CURRENT_DAY: string;

function getStream(): WriteStream {
  CURRENT_DAY = new Date().toLocaleDateString()
  const fileName: string = join(LOGS_PATH, `/${CURRENT_DAY}.log`)
  return createWriteStream(fileName, { flags: 'a' })
}

function writeLine(data: string): void {
  //检查流是否存在
  if (!STREAM) {
    STREAM = getStream()
  }
  //检查当前时间是否过期
  const newDay: string = new Date().toLocaleDateString()
  if (newDay !== CURRENT_DAY) {
    STREAM.close()
    STREAM = getStream()
  }
  STREAM.write(data + '\r\n')
}

export interface Message {
  type: keyof MESSAGE_TYPE
  msg: string
  pid?: number
}
export type MESSAGE_TYPE = {
  WORKER_STARTUP: string
  WORKET_EXIT: string
  MASTER_STARTUP: string
  ERROR: string
  REQUEST: string
  REDIRECT: string
  RES_CACHE: string
  RES_ZIP: string
  RES_416: string
  RES_RANGE: string
  RES_404: string
  RES_FILE: string
  RES_DIR: string
}

export function DEBUG(massage: Message): void {
  //做异步处理，提升性能
  process.nextTick(DEBUG_TASK, massage)
}

function DEBUG_TASK(massage: Message): void {
  const { type, msg, pid = process.pid } = massage
  const date: string = new Date().toLocaleString()
  const mq: string = `[${date}] [${pid}] [${type}] -> ${msg}`
  console.log(mq)
  writeLine(mq)
}

/**
 * master action
 */
export interface Action {
  type: keyof ACTION_TYPE
}
export type ACTION_TYPE = {
  RE_START: string
  SHUT_DOWN: string
}
export function SEND(cmd: Action): void {
  const { type } = cmd
  if (process.send) {
    process.send({ type })
  } else {
    console.log('worker进程无法处理命令')
  }
}