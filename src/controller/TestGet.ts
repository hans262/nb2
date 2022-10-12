import { Controller } from "../interface/Controller.js";
import { Context } from "../interface/Context.js";

export class TestGet implements Controller {
	readonly PATH_NAME: string = '/api/get'
	GET(ctx: Context) {
		const { url: { searchParams }, res } = ctx
		res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' })
		res.end(searchParams.toString())
	}
}