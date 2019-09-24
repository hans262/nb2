import { ClientRequest, IncomingMessage, request, RequestOptions } from 'http';

export interface Request extends RequestOptions {
  body?: any
  hostname: string
  method: 'GET' | 'POST'
  path: string
  port: number
}

export interface Response {
  statusCode: number
  response: Buffer
  url: string
  method: string
}

/**
 * http test
 * @param config
 */
export function it(config: Request): Promise<Response> {
  const { body, method, path } = config
  if (!path.startsWith('/')) {
    config.path = '/' + path
  }
  return new Promise<Response>((
    resolve: (value: Response) => void,
    reject: (reason: Error) => void
  ) => {
    const req: ClientRequest = request(config, (res: IncomingMessage) => {
      const { statusCode = 400 } = res
      const chunks: Array<Buffer> = []
      res.on('data', (chunk: Buffer) => {
        chunks.push(chunk)
      })
      res.on('end', () => {
        const buffer: Buffer = Buffer.concat(chunks)
        resolve({ statusCode, response: buffer, url: path, method })
      })
    })
    req.on('error', (err: Error) => {
      reject(err)
    })
    if (method === 'POST' && body) {
      req.write(body)
    }
    req.end()
  })
}