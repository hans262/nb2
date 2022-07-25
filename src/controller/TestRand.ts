import { Controller } from "../Interface/Controller.js";
import { Context } from "../Interface/Context.js";

export class TestRand implements Controller {
  readonly PATH_NAME: string = '/api/rand/*'
  GET(ctx: Context) {
    const { res, query } = ctx
    res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' })
    res.end(JSON.stringify(query))
  }
}