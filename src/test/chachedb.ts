interface Token {
  id: string
  expire: number
  count: number
}

type TokenDb = Map<string, Token>

interface Store {
  token: TokenDb
}

/**
 * 创建 CREATE
 * 增 ADD
 * 删 DELETE
 * 改 UPDATE
 * 查 SELECT
 */

export class CacheDb {
  private store: Store = {
    token: new Map()
  }
  EXPIRES: number = 20 * 60 * 1000

  ADD_TOKEN() {
    const t: Token = {
      id: (Date.now() + Math.random()).toString(),
      expire: Date.now() + this.EXPIRES,
      count: 0
    }
    this.store.token.set(t.id, t)
  }

  DELETE_TOKEN(id: string) {
    return this.store.token.delete(id)
  }

  UPDATE_TOKEN(id: string) {
    const token = this.store.token.get(id)
    if (!token) return false
    this.store.token.set(id, {
      ...token,
      expire: Date.now() + this.EXPIRES,
      count: token.count + 1
    })
    return true
  }

  SELETE_TOKEN(id: string) {
    return this.store.token.get(id)
  }
}




/**
 *
 * fork 出来的进程 允许在父进程与子进程之间发送消息。
 *
 * 基于IPC管道通信，我觉得很容易设计出一个缓存共享服务进程
 *
 *
 * 或者用 socket来实现进程间通信，这样就可以跨网络跨机器
 * 服务端采用 一个队列的机制，来收集更新数据的任务
 *
 */

/**
 * 协议
 *
 * 服务端只处理客户端发送的第一条消息，即once事件
 * 服务端解析此条消息后，返回类容
 * 返回后，直接关闭socket连接
 *
 * 接受消息的尺寸：目前阶段不做控制，尽量小
 *
 * 客户端：
 * 发送一条消息后，直接接收服务端的第一条消息，即once事件
 * 收到后关闭此连接
 *
 *
 */
