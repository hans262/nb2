import { Controller, Context } from "../../src/index.js";

export class TestGet implements Controller {
	readonly pathname = '/api/get'
	GET(ctx: Context) {
		const { url: { searchParams }, res } = ctx
		res.writeHead(200, { 'Content-Type': ctx.getContentType('json') })
		console.log(searchParams)
		res.end(JSON.stringify({ a: 1, b: 2 }))
	}
}