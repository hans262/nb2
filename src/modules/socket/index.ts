import { Socket, createConnection } from "net";


interface SocketOptions {
  max?: number
  min?: number
  port: number
  host?: string
}

class SocketPool {
  max: number = 10
  min: number = 1
  port: number = 9999
  host: string = '0.0.0.0'
  connections: Array<Socket> = []
  constructor(options: SocketOptions) {
    


  }
  createSocket() {

  }

}