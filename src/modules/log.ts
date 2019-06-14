import { writeFileSync } from 'fs';
import { join } from 'path';
import { LOG_PATH } from '../utils/path';

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

export function WRITE_LINE(data: string): void {
  const currentDay = new Date().toLocaleDateString()
  const fileName = join(LOG_PATH, `/${currentDay}.log`)
  data += '\r\n'
  writeFileSync(fileName, data, {
    flag: 'a'
  })
}