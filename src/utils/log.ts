export interface Message {
  type: string
  msg: string
  pid: number
}

export function LOG(massage: Message) {
  const { type, msg, pid } = massage
  const nowTime = new Date().toLocaleString()
  console.info(`[${type}] pid: ${pid} date: ${nowTime} -> ${msg}`)
}