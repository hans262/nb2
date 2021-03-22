import { Stats } from "fs";
import { IncomingMessage, ServerResponse } from "http";
import { ParsedUrlQuery } from "querystring";

export class Context {
  req: IncomingMessage
  res: ServerResponse
  stats?: Stats
  relativePath?: string
  absolutePath?: string
  query?: ParsedUrlQuery
  startTime?: number
  constructor(req: IncomingMessage, res: ServerResponse) {
    this.req = req
    this.res = res
  }
  setStats(s: Stats) {
    this.stats = s
  }
  setQuery(q: ParsedUrlQuery) {
    this.query = q
  }
  setRelativePath(p: string) {
    this.relativePath = p
  }
  setAbsolutePath(p: string) {
    this.absolutePath = p
  }
  setStartTime(t: number) {
    this.startTime = t
  }
}