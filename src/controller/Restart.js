// @restart 重启
class Restart {
	static PATH = '/api/restart'
	GET(req, res) {
		res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' })
		res.end(`服务器将在10后，平滑重启，不影响使用体验`)
		process.send({ type: 'RE_START' })
	}
}

module.exports = Restart