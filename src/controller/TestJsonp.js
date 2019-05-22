class TestJsonp {
	static PATH = '/api/jsonp'
	GET(req, res) {
		res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' })
		const { query } = req
		const { callback, ...data } = query
		res.end(`${callback}(${JSON.stringify(data)})`)
	}
}

module.exports = TestJsonp