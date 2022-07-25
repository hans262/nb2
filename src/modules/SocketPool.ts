import { Socket, createConnection } from "node:net";

export interface SocketOptions {
  port: number
  limit?: number
  host?: string
  timeout?: number
}
/**
 * socket connection pool
 * 默认连接数为空，动态创建，随使用增加
 */
export class SocketPool {
  PORT: number
  LIMIT: number = 20
  HOST: string = '0.0.0.0'
  TIMEOUT: number = 2000
  CONNECTIONS: Array<Socket> = []
  CURRENT: number = 0
  constructor(options: SocketOptions) {
    const { port, limit, host, timeout } = options
    this.PORT = port
    this.LIMIT = limit ? limit : this.LIMIT
    this.HOST = host ? host : this.HOST
    this.TIMEOUT = timeout ? timeout : this.TIMEOUT
  }

  createSocket(fn: (err: Error | null, socket?: Socket) => void): void {
    //创建
    const socket = createConnection({ port: this.PORT, host: this.HOST })
    //处理超时
    const id = setTimeout(() => {
      socket.destroy()
      fn(new Error('创建连接时连接超时，请稍后再试'))
    }, this.TIMEOUT)
    socket.on('connect', () => {
      clearTimeout(id)
      this.CURRENT++
      fn(null, socket)
    })
    socket.on('error', (err: Error) => {
      socket.destroy()
      fn(err)
    })
  }

  getConnection(fn: (err: Error | null, socket?: Socket) => void): void {
    const socket: Socket | undefined = this.CONNECTIONS.shift()
    if (!socket) {
      //判断当前socket是否溢出，然后抛出错误
      if (this.CURRENT >= this.LIMIT) {
        return fn(new Error('超出了最大连接数，无法创建新的连接，请等待再继续获取连接。。'))
      }
      //没有溢出，创建一个新的
      return this.createSocket((err: Error | null, socket: Socket | undefined) => {
        if (err) return fn(err)
        fn(null, socket)
      })
    }
    //判断是否有效，然后创建一个新的
    if (!socket.readable || !socket.writable) {
      socket.destroy()
      this.CURRENT--
      return this.createSocket((err: Error | null, socket: Socket | undefined) => {
        if (err) return fn(err)
        fn(null, socket)
      })
    }
    //成功拿到socket
    fn(null, socket)
  }

  //必须释放连接
  release(socket: Socket): void {
    this.CONNECTIONS.push(socket)
  }
}

/*
  测试
  const POOL: SocketPool = new SocketPool({ port: 9999 })
  POOL.getConnection((err: Error | null, socket: Socket | undefined) => {
    if (err || !socket) return
    socket.write('hello')
    socket.once('data', data => {
      console.log(data.toString())
      POOL.release(socket)
    })
  })
*/