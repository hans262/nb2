import { Controller } from '../../src/ainterface/Controller.js';
import { Context } from '../../src/ainterface/Context.js';
import { SEND } from '../../src/common/logger.js';

export class ShutDown implements Controller {
	readonly PATH_NAME:string = '/api/shutdown'
	GET(ctx: Context) {
		ctx.res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' })
		ctx.res.end(`服务器将在10s后关闭！`)
		SEND({ type: 'SHUT_DOWN' })
	}
}