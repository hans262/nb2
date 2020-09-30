const https = require('https')
const fs = require('fs')
const options = {
  key: fs.readFileSync('./server.key'),
  cert: fs.readFileSync('./server.crt')
}

https.createServer(options, (req, res) => {
  res.writeHead(200)
  res.end("hello https!")
}).listen(8888)