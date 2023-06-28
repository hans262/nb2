import { Context } from '../../src/index.js';
import { Controller } from '../../src/ainterface/Controller.js';
import { SEND } from '../../src/common/logger.js';

export class Restart implements Controller {
	readonly PATH_NAME: string = '/api/restart'
	GET(ctx: Context) {
		ctx.res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' })
		ctx.res.end(`服务器将在10后，平滑重启，不影响使用体验`)
		SEND({ type: 'RE_START' })
	}
}