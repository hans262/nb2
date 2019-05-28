import { ServerResponse } from "http";
import { Req } from "../Interface/Req";

export default class TestGet {
	static PATH = '/api/get'
	GET(req: Req, res: ServerResponse): void {
		res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' })
		const { query } = req
		res.end(JSON.stringify(query))
	}
}