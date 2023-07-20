import { Controller, Context } from "../../src/index.js";

export class TestRand implements Controller {
  readonly pathname = '/api/rand/*'
  GET(ctx: Context) {
    const { res, pathname } = ctx
    res.writeHead(200, { 'Content-Type': ctx.getContentType('plain') })
    res.end(pathname)
  }
}