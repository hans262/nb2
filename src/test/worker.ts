import { parentPort, workerData, threadId } from 'worker_threads'
import { WriteStream, createWriteStream } from 'fs';
import { join } from 'path';
import { PUBLIC_PATH } from '../common/path';

const writeStream: WriteStream = createWriteStream(
  join(PUBLIC_PATH, 'text.txt'),
  { flags: 'a' }
)

const num = 200000
for (let i = 0; i < num; i++) {
  writeStream.write(threadId + ' hello world ' + i + '\r\n')
}
writeStream.close()