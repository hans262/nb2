// @restart 重启
class Restart {
	constructor() {
		this.method = 'GET'
		this.path = '/api/restart'
	}
	handler(req, res) {
		res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' })
		res.end(`服务器将在10后，平滑重启，不影响使用体验`)
		process.send({ type: 'RE_START' })
	}
}

module.exports = new Restart()