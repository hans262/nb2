import { createWriteStream, WriteStream } from 'fs';
import { join } from 'path';
import { LOG_PATH } from '../utils/path';

export function CREATE_STREAM(): WriteStream {
	const CURRENT_DAY = new Date().toLocaleDateString()
	const FILE_NAME = join(LOG_PATH, `/${CURRENT_DAY}.log`)
	const STREAM = createWriteStream(FILE_NAME, {
		flags: 'a',
		encoding: 'utf8'
	})
	return STREAM
}

const STREAM=CREATE_STREAM()

export function WRITE(MSG) {
	STREAM.write(MSG)
	STREAM.write('\r\n')
}

WRITE('DWQDQ')
WRITE('SFSDF')