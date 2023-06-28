import { Controller } from "../../src/ainterface/Controller.js";
import { Context } from "../../src/ainterface/Context.js";

export class TestRand implements Controller {
  readonly PATH_NAME: string = '/api/rand/*'
  GET(ctx: Context) {
    const { res, url: { searchParams } } = ctx
    res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' })
    res.end(searchParams.toString())
  }
}