import { Controller } from "../../src/interface/Controller.js";
import { Context } from "../../src/interface/Context.js";

export class TestGet implements Controller {
	readonly PATH_NAME: string = '/api/get'
	GET(ctx: Context) {
		const { url: { searchParams }, res } = ctx
		res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' })
		console.log(searchParams)
		res.end(JSON.stringify({ a: 1, b: 2 }))
	}
}