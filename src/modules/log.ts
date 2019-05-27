interface Message {
  type: string
  msg: string
  pid?: number
}

export function LOG(massage: Message): void {
  const { type, msg, pid = process.pid } = massage
  const nowTime: string = new Date().toLocaleString()
  console.info(`[${type}] pid: ${pid} date: ${nowTime} -> ${msg}`)
}

interface Cmd {
  type: string
}
export function SEND(cmd: Cmd): void {
  const { type } = cmd
  if (process.send) {
    process.send({ type })
  } else {
    console.log('worker进程无法处理命令')
  }
}