import { createWriteStream, WriteStream } from 'fs';
import { join } from 'path';
import { LOG_PATH } from '../utils/path';

export function SEND(cmd: Action): void {
  const { type } = cmd
  if (process.send) {
    process.send({ type })
  } else {
    console.log('worker进程无法处理命令')
  }
}
export interface Action {
  type: string
}

let STREAM: WriteStream | null = null;
let CURRENT_DAY: string;

function getStream(): WriteStream {
  CURRENT_DAY = new Date().toLocaleDateString()
  const fileName: string = join(LOG_PATH, `/${CURRENT_DAY}.log`)
  return createWriteStream(fileName, { flags: 'a' })
}

export function WRITE_LINE(data: string): void {
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
  type: string
  msg: string
  pid?: number
}

export function LOG(massage: Message): void {
  const { type, msg, pid = process.pid } = massage
  const date: string = new Date().toLocaleString()
  const str: string = `[${date}] [${pid}] [${type}] -> ${msg}`
  console.info(str)
  WRITE_LINE(str)
}