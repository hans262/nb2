import { createWriteStream, WriteStream } from 'fs';
import { join } from 'path';
import { LOGS_PATH } from '../common/path';
import { MESSAGE, ACTION } from '../Interface/Message';
import { Stdout } from '../common/stdout';

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

function DEBUG_TASK(massage: MESSAGE): void {
  const { type, msg, pid = process.pid } = massage
  const date: string = new Date().toLocaleString()
  const mq: string = `[${date}] [${pid}] [${type}] -> ${msg}`
  Stdout.debug(type, mq)
  writeLine(mq)
}
/**
 * debuger
 * @param massage 
 */
export function DEBUG(massage: MESSAGE): void {
  //做异步处理，提升性能
  process.nextTick(DEBUG_TASK, massage)
}

/**
 * send to master
 */
export function SEND(cmd: ACTION): void {
  const { type } = cmd
  //IPC 通道是否连接
  if (process.connected) {
    process.send!({ type })
  } else {
    console.log('worker进程无法处理命令')
  }
}