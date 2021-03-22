import { Controller } from '../Interface/Controller';
import { Context } from '../Interface/Context';
import { SEND } from '../modules/logger';

export class ShutDown implements Controller {
	readonly PATH_NAME:string = '/api/shutdown'
	GET(ctx: Context) {
		ctx.res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' })
		ctx.res.end(`服务器将在10s后关闭！`)
		SEND({ type: 'SHUT_DOWN' })
	}
}