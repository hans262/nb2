export interface Message {
  type: string
  msg: string
  pid?: number
}

export function LOG(massage: Message): void {
  const { type, msg, pid = process.pid } = massage
  const date: string = new Date().toLocaleString()
  console.info(`[${date}] [${type}] pid: ${pid} -> ${msg}`)
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