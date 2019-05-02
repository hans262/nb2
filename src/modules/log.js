const fs = require('fs')

const d = new Date()
var msg = 'Hello Worlds!'

const dd = d.toLocaleDateString()
const logFileName = `../../log/${dd}.log`

const ds = d.toLocaleString()
msg = `LOG: ${ds} MSG: ${msg}`
const out = fs.createWriteStream(logFileName, {
	flags: 'a',
	encoding: 'utf8'
})

out.write(msg)
out.write('\r\n')
out.end()

out.on('error', function () {
	// console.log(writing failed)
	console.log(error)
})
out.on('finish', function () {
	console.log("writing success!")
})