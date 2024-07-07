import { Controller, Context, Get } from '../../src/index.js';

@Controller('system')
export class System__ {
	@Get()
	page(ctx: Context) {
		// console.log('有哪些进程在运行')
		ctx.html(`
			<ul>
				<li>1212</li>
			</ul>
		`)
	}

	@Get('shutdown')
	shutdown(ctx: Context) {
		ctx.text(`服务器将在10s后关闭！`)
		ctx.app.close(0)
	}

	@Get('restart')
	restart(ctx: Context) {
		ctx.text(`服务器将在10s后重启，不影响使用体验`)
		process.send?.('restart')
	}
}