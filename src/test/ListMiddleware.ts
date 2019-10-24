import { createServer, ServerResponse, Server } from "http"
import { Req } from "../Interface/Req"

/**
 * 中间应该是一个链表
 * 上一个中间件能拿到下一个中间件
 * 从而控制是否执行下一个中间件
 * 
 * 这样程序一开始只需要执行第一个中间件就行了
 * 达到了主程序逻辑清晰
 * 
 * 链表中间件的主要作用
 * 把控制权直接交给上一个节点
 * 
 * 缺陷，初始化第一个中间件的时候
 * 需要把所有的后续中间件依赖都传入进去
 * 
 * 如果能在单个中间件控制依赖就好了
 * 但是又不能达到控制反转的效果
 * 
 */

interface Mid {
  run(req: Req, res: ServerResponse): void
  next?: Mid
}

class M1 implements Mid {
  constructor(public next: Mid) { }
  run(req: Req, res: ServerResponse) {
    res.write('1')
    this.next.run(req, res)
  }
}

class M2 implements Mid {
  constructor(public next: Mid) { }
  run(req: Req, res: ServerResponse) {
    res.write('2')
    this.next.run(req, res)
  }
}

class M3 implements Mid {
  constructor() { }
  run(req: Req, res: ServerResponse) {
    res.write('3')
    res.end()
  }
}

const midList = new M1(new M2(new M3()))

class App {
  server: Server
  constructor() {
    this.server = createServer(this.handle)
  }
  handle(req: Req, res: ServerResponse) {
    try {
      midList.run(req, res)
    } catch (err) {
      res.writeHead(500, { 'Content-Type': 'application/json; charset=utf-8' })
      res.end('500 服务器错误 ' + err.message)
    }
  }

  listen(port: number) {
    this.server.listen(port)
  }
}

const app = new App()
app.listen(5555)