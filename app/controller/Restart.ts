import { Context, Controller } from '../../src/index.js';

export class Restart implements Controller {
	readonly pathname = '/api/restart'
	GET(ctx: Context) {
		ctx.res.writeHead(200, {
			'Content-Type': ctx.getContentType('plain')
		})
		ctx.res.end(`服务器将在10s后重启，不影响使用体验`)
		ctx.app.close(1)
	}
}