import { ServerResponse } from "http";
import { Req } from "../Interface/Req";

export default class TestPost {
	static PATH = '/api/post'
	POST(req: Req, res: ServerResponse): void {
		res.setHeader('Content-Type', 'application/octet-stream; charset=utf-8')
		res.writeHead(200, 'OK')
		const chunks: Array<Buffer> = []
		req.on('data', (chunk: Buffer) => {
			chunks.push(chunk)
		})
		req.on('end', () => {
			const buffer: Buffer = Buffer.concat(chunks)
			res.end(buffer)
		})
	}
}