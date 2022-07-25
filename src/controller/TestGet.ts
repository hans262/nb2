import { Controller } from "../Interface/Controller.js";
import { Context } from "../Interface/Context.js";

export class TestGet implements Controller {
	readonly PATH_NAME: string = '/api/get'
	GET(ctx: Context) {
		const { query, res } = ctx
		res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' })
		res.end(JSON.stringify(query))
	}
}