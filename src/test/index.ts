import { request } from 'https'
import { writeFileSync } from 'fs'
import { join } from 'path'
import { PUBLIC_PATH } from '../common/path'

const options = {
  hostname: 'www.baidu.com',
  port: 443,
  path: '/',
  method: 'GET'
}

const req = request(options, res => {
  console.log('状态码:', res.statusCode)
  console.log('请求头:', res.headers)
  const chunks:Buffer[] = []
  res.on('data', (d: Buffer) => {
    chunks.push(d)
  })
  res.on('end', () =>{
    const data = Buffer.concat(chunks)
    writeFileSync(join(PUBLIC_PATH, './baidu.html'), data)
  })
})

req.on('error', (e) => {
  console.error(e)
})
req.end()
