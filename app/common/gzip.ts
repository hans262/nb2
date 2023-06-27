import { createReadStream, createWriteStream, ReadStream, WriteStream } from 'node:fs';
import { join } from 'node:path';
import { createGzip, Gzip, createGunzip } from 'node:zlib';
import { PUBLIC_PATH } from '../../src/common/path.js';

/**
 * to gzip
 */
export function toGzip() {
  const gzip: Gzip = createGzip()
  const inp: ReadStream = createReadStream(join(PUBLIC_PATH, 'input.txt'))
  const out: WriteStream = createWriteStream(join(PUBLIC_PATH, 'input.txt.gz'))
  inp.pipe(gzip).pipe(out)
}

/**
 * to gunzip
 */
export function toGunzip() {
  const gzip: Gzip = createGunzip()
  const inp: ReadStream = createReadStream(join(PUBLIC_PATH, 'input.txt.gz'))
  const out: WriteStream = createWriteStream(join(PUBLIC_PATH, 'input.txt'))
  inp.pipe(gzip).pipe(out)
}