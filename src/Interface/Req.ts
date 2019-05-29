import { Stats } from "fs";
import { IncomingMessage } from "http";
import { ParsedUrlQuery } from "querystring";
import { Gzip, Deflate } from "zlib";

export interface Req extends IncomingMessage {
  __stats?: Stats
  __relativePath?: string
  __absolutePath?: string
  __query?: ParsedUrlQuery
  __zipstream?: Gzip | Deflate
}