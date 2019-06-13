import { ClientRequest, IncomingMessage, request, RequestOptions } from 'http';
/**
 * get数据以url传送
 */
const get: RequestOptions = {
  protocol: 'http:',
  hostname: '127.0.0.1',
  port: 5000,
  path: '/api/get?haha=dwq',
  method: 'GET',
  timeout: 5000
}
/**
 * post数据以流的形式发送
 */
const postData: string = 'hello world'
const post: RequestOptions = {
  protocol: 'http:',
  hostname: '127.0.0.1',
  port: 5000,
  path: '/api/post',
  method: 'POST',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Content-Length': Buffer.byteLength(postData)
  },
  timeout: 5000
}

//发起请求
const req: ClientRequest = request(post, (res: IncomingMessage) => {
  const { statusCode, headers } = res
  console.log(statusCode)
  console.log(headers)
  const chunks: Array<Buffer> = []
  res.on('data', (chunk: Buffer) => {
    chunks.push(chunk)
  })
  res.on('end', () => {
    const buffer: Buffer = Buffer.concat(chunks)
    console.log(buffer.toString())
  })
})
//监听请求报错
req.on('error', (err: Error) => {
  console.error(err)
})

//发送数据
req.write(postData)
req.end()