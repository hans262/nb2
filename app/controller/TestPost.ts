import { Controller, Context } from "../../src/index.js";

export class TestPost implements Controller {
	readonly pathname = '/api/post'
	async POST(ctx: Context) {
		const { res } = ctx
		res.setHeader('Content-Type', 'application/octet-stream; charset=utf-8')
		res.writeHead(200, 'OK')
		const buffer = await ctx.getBodyData()
		res.end(buffer)
	}
}