import { createReadStream, ReadStream } from 'fs';
import { ServerResponse } from "http";
import { Req } from "../Interface/Req";
import { DEBUG } from '../modules/logger';

export function ResFile(req: Req, res: ServerResponse): void {
  const { __absolutePath } = req
  const stream: ReadStream = createReadStream(__absolutePath!)
  res.writeHead(200, 'Responed file')
  stream.pipe(res)
  DEBUG({ type: 'RES_FILE', msg: __absolutePath! })
}