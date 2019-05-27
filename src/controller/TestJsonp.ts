import { Req } from "../Interface/Req";
import { ServerResponse } from "http";

export default class TestJsonp {
	static PATH = '/api/jsonp'
	GET(req: Req, res: ServerResponse): void {
		res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' })
		const { query } = req
		const { callback, ...data } = query
		res.end(`${callback}(${JSON.stringify(data)})`)
	}
}