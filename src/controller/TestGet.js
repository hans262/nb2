class TestGet {
	static PATH = '/api/get'
	GET(req, res) {
		res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' })
		const { query } = req
		res.end(JSON.stringify(query))
	}
}

module.exports = TestGet