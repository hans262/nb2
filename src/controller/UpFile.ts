import { writeFileSync } from 'fs'
import { Req } from '../Interface/Req';
import { ServerResponse } from 'http';
import { PUBLIC_PATH } from '../utils/path'
import { join } from 'path'
/**
 * 上传 目前只支持单个文件上传
 */
export default class UpFile {
	static PATH = '/api/upfile'
	POST(req: Req, res: ServerResponse): void {
		const chunks: Array<Buffer> = []
		req.on('data', (chunk: Buffer) => {
			chunks.push(chunk)
		})
		req.on('end', () => {
			// const boundary=req.headers['content-type'].split('boundary=')[1] //多文件分割符
			//拿到总的数据体
			const buffers: Buffer = Buffer.concat(chunks)
			//统计\r\n数据的索引位置
			const rems: Array<number> = []
			for (let i = 0; i < buffers.length; i++) {
				//13代表\r 10代表\n
				if (buffers[i] == 13 && buffers[i + 1] == 10) {
					rems.push(i)
				}
			}
			//获取上传信息
			console.log(rems)
			console.log('第一行')
			console.log(buffers.slice(0, rems[0]).toString())
			console.log('第二行')
			console.log(buffers.slice(rems[0] + 2, rems[1]).toString())
			console.log('第三行')
			console.log(buffers.slice(rems[1] + 2, rems[2]).toString())
			console.log('第四行')
			console.log(buffers.slice(rems[2] + 2, rems[3]).toString())
			// console.log('第五行')
			// console.log(buffers.slice(rems[3]+2,rems[4]).toString())

			//文件名
			const fileName: string = buffers.slice(rems[0] + 2, rems[1]).toString().match(/(?<=filename=")[^"]+(?=")/)[0]
			console.log('文件名: ' + fileName)
			//文件内容
			const fileBuf: Buffer = buffers.slice(rems[3] + 2, rems[rems.length - 2])
			writeFileSync(join(PUBLIC_PATH, fileName), fileBuf, 'utf8')

			//相应客户端
			res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' })
			res.end(JSON.stringify({ sucess: true, result: '上传成功' }))
		})
	}
}