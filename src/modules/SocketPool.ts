import { Socket, createConnection } from "net";

interface SocketOptions {
  max?: number
  min?: number
  port: number
  host?: string
  timeout?: number
}

class SocketPool {
  MAX_LIMIT: number = 10
  MIN_LIMIT: number = 2
  PORT: number = 9999
  HOST: string = '0.0.0.0'
  CONNECTIONS: Array<Socket> = []
  current: number = 0
  constructor(options: SocketOptions) {
    const { max, min, port, host } = options
    this.MAX_LIMIT = max ? max : this.MAX_LIMIT
    this.MIN_LIMIT = min ? min : this.MIN_LIMIT
    this.PORT = port ? port : this.PORT
    this.HOST = host ? host : this.HOST

    this.initConnections()
  }
  initConnections(): void {
    for (let i = 0; i < this.MIN_LIMIT; i++) {
      this.createSocket(socket => {
        this.current = this.CONNECTIONS.push(socket)
      })
    }
  }
  createSocket(fn: (socket: Socket) => void): void {
    const socket = createConnection({ port: this.PORT, host: this.HOST })
    socket.on('connect', () => {
      fn(socket)
    })
    socket.on('close', (err: boolean) => {
      console.log(err)
      socket.destroy()
    })
    socket.on('error', (err: Error) => {
      console.log(err)
      socket.destroy()
    })
  }

  getConnection(fn: (err: Error | null, socket?: Socket) => void): void {
    const socket = this.CONNECTIONS.shift()
    if (!socket) {
      if (this.current >= this.MAX_LIMIT) {
        return fn(new Error('超出最大连接数'))
      }
      this.createSocket(socket => {
        fn(null, socket)
      })
    } else {
      this.current -= 1
      fn(null, socket)
    }
  }

  release(socket: Socket): void {
    this.current = this.CONNECTIONS.push(socket)
  }
}

//初始化创建过程为异步
const sp = new SocketPool({ port: 9999 })

setTimeout(() => {
  sp.getConnection((err: Error | null, socket: Socket | undefined) => {
    if (err || !socket) return
    socket.write('hello')
    socket.on('data', data => {
      console.log(data.toString())
      sp.release(socket)
    })
  })
}, 1000)