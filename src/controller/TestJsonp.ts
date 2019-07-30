import { ServerResponse } from "http";
import { Controller } from "../Interface/Controller";
import { Req } from "../Interface/Req";

export class TestJsonp implements Controller {
	PATH_NAME: string = '/api/jsonp'
	GET(req: Req, res: ServerResponse): void {
		res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' })
		const { __query } = req
		const { callback, ...data } = __query!
		res.end(`${callback}(${JSON.stringify(data)})`)
	}
}