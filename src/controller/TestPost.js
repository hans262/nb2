class TestPost {
	static PATH = '/api/post'
	async POST(req, res) {
		res.setHeader('Content-Type', 'application/octet-stream; charset=utf-8')
		res.writeHead(200, 'OK')
		let chunks = []
		req.on('data', chunk => {
			chunks.push(chunk)
		})
		req.on('end', () => {
			const buffer = Buffer.concat(chunks)
			res.end(buffer)
		})
	}
}

module.exports = TestPost