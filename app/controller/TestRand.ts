import { Controller } from "../../src/interface/Controller.js";
import { Context } from "../../src/interface/Context.js";

export class TestRand implements Controller {
  readonly PATH_NAME: string = '/api/rand/*'
  GET(ctx: Context) {
    const { res, url: { searchParams } } = ctx
    res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' })
    res.end(searchParams.toString())
  }
}