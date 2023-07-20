import { Controller, Context } from "../../src/index.js";

export class TestPost implements Controller {
	readonly pathname = '/api/post'
	async POST(ctx: Context) {
		ctx.res.writeHead(200, 'OK', {
			'Content-Type': ctx.getContentType('json')
		})

		const buffer = await ctx.getBodyData()
		console.log(buffer.toString())
		ctx.res.end(JSON.stringify({ a: 1, b: 3 }))
	}
}