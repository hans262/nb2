const fs = require('fs')
const { join } = require('path')
const { LOG_PATH } = require('../utils/path')

let STREAM=null

function CREATE_STREAM() {
	if(STREAM){
		STREAM.close()
	}
	const CURRENT_DAY = new Date().toLocaleDateString()
	const FILE_NAME = join(LOG_PATH, `/${CURRENT_DAY}.log`)
	STREAM = fs.createWriteStream(FILE_NAME, {
		flags: 'a',
		encoding: 'utf8'
	})
}

CREATE_STREAM()

function WRITE(MSG) {
	STREAM.write(MSG)
	STREAM.write('\r\n')
}

WRITE('DWQDQ')
WRITE('SFSDF')

module.exports = {
	CREATE_STREAM,
	STREAM,
	WRITE,
}