import { Stats } from "fs";
import { IncomingMessage } from "http";
import { ParsedUrlQuery } from "querystring";

export interface Req extends IncomingMessage {
  stats?: Stats
  relativePath?: string
  absolutePath?: string
  query?: ParsedUrlQuery
}