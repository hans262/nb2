// @jsonp
class Jsonp {
	constructor() {
		this.method = 'GET'
		this.path = '/api/jsonp'
	}
	handler(req, res) {
		res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' })
		const { query } = req
		const { callback, ...data } = query
		res.end(`${callback}(${JSON.stringify(data)})`)
	}
}

module.exports = new Jsonp()