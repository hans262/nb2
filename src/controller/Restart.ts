import { SEND } from '../modules/log'
import { Req } from '../Interface/Req';
import { ServerResponse } from 'http';

export default class Restart {
	static PATH = '/api/restart'
	GET(req: Req, res: ServerResponse): void {
		res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' })
		res.end(`服务器将在10后，平滑重启，不影响使用体验`)
		SEND({ type: 'RE_START' })
	}
}