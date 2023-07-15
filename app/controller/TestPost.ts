import { Controller, Context, getBodyData } from "../../src/index.js";

export class TestPost implements Controller {
	readonly PATH_NAME: string = '/api/post'
	async POST(ctx: Context) {
		const { res } = ctx
		res.setHeader('Content-Type', 'application/octet-stream; charset=utf-8')
		res.writeHead(200, 'OK')
		const buffer = await getBodyData(ctx.req)
		res.end(buffer)
	}
}