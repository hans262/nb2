import { Context, Controller } from '../../src/index.js';

export class Restart implements Controller {
	readonly PATH_NAME: string = '/api/restart'
	GET(ctx: Context) {
		ctx.res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' })
		ctx.res.end(`服务器将在10s后重启，不影响使用体验`)
		ctx.emit({ type: 'restart' })
	}
}