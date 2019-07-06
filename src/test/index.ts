import { createReadStream, createWriteStream, ReadStream, WriteStream } from 'fs';
import { join } from 'path';
import { createGzip, Gzip } from 'zlib';
import { PUBLIC_PATH } from '../utils/path';

const gzip: Gzip = createGzip()
const inp: ReadStream = createReadStream(join(PUBLIC_PATH, 'input.txt'))
const out: WriteStream = createWriteStream(join(PUBLIC_PATH, 'input.txt.gz'))

inp.pipe(gzip).pipe(out)