import { Stats } from "node:fs";
import { IncomingMessage, ServerResponse } from "node:http";
import { ParsedUrlQuery } from "node:querystring";

export class Context {
  stats?: Stats
  relativePath?: string
  absolutePath?: string
  query?: ParsedUrlQuery
  startTime?: number
  constructor(public req: IncomingMessage, public res: ServerResponse) { }
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