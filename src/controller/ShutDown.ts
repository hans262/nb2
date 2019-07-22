import { ServerResponse } from 'http';
import { Controller } from '../Interface/Controller';
import { Req } from '../Interface/Req';
import { SEND } from '../modules/logger';

export default new class ShutDown implements Controller {
	PATH_NAME:string = '/api/shutdown'
	GET(req: Req, res: ServerResponse): void {
		res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' })
		res.end(`服务器将在10s后关闭！`)
		SEND({ type: 'SHUT_DOWN' })
	}
}