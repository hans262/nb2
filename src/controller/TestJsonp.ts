import { Controller } from "../Interface/Controller.js";
import { Context } from "../Interface/Context.js";

export class TestJsonp implements Controller {
	readonly PATH_NAME: string = '/api/jsonp'
	GET(ctx: Context) {
		const { res, query } = ctx
		res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' })
		const { callback, ...data } = query!
		res.end(`${callback}(${JSON.stringify(data)})`)
	}
}