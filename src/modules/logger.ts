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

function WRITE_LINE(data: string): void {
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
type MESSAGE_TYPE = {
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
  const { type, msg, pid = process.pid } = massage
  const date: string = new Date().toLocaleString()
  const str: string = `[${date}] [${pid}] [${type}] -> ${msg}`
  console.info(str)
  WRITE_LINE(str)
}

//向主进程发消息
export interface Action {
  type: string
}
export function SEND(cmd: Action): void {
  const { type } = cmd
  if (process.send) {
    process.send({ type })
  } else {
    console.log('worker进程无法处理命令')
  }
}