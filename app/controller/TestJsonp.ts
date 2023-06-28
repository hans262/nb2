import { Controller } from "../../src/ainterface/Controller.js";
import { Context } from "../../src/ainterface/Context.js";

export class TestJsonp implements Controller {
	readonly PATH_NAME: string = '/api/jsonp'
	GET(ctx: Context) {
		const { res, url: { searchParams } } = ctx
		res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' })
		const callback = searchParams.get('callback')
		//客户端一定要传的参数
		res.end(`${callback}(${searchParams.toString()})`)
	}
}