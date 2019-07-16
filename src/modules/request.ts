import { ClientRequest, IncomingMessage, request, RequestOptions } from 'http';

export interface MyRequestOptions extends RequestOptions {
  body?: any
}
/**
 * 请求器
 * @param config MyRequestOptions
 */
export function it(config: MyRequestOptions): Promise<Buffer> {
  const { body, method } = config
  return new Promise<Buffer>((
    resolve: (value?: Buffer) => void,
    reject: (reason?: Error | string) => void
  ) => {
    const req: ClientRequest = request(config, (res: IncomingMessage) => {
      const { statusCode } = res
      if (!statusCode) {
        return reject('statusCode no exist!')
      }
      if (statusCode < 200 || statusCode >= 400) {
        return reject('statusCode = ' + statusCode)
      }
      const chunks: Array<Buffer> = []
      res.on('data', (chunk: Buffer) => {
        chunks.push(chunk)
      })
      res.on('end', () => {
        const buffer: Buffer = Buffer.concat(chunks)
        resolve(buffer)
      })
    })
    req.on('error', (err: Error) => {
      reject(err)
    })
    if (method && method === 'POST' && body) {
      req.write(body)
    }
    req.end()
  })
}

; (async () => {
  try {
    const ret = await it({
      hostname: '127.0.0.1',
      port: 5000,
      path: '/api/post',
      method: 'POST',
      timeout: 1500,
      body: 'hello world'
    })
    console.log(ret.toString())
  } catch (err) {
    console.log(err)
  }
})()