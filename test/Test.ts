import { Controller, Context, Get, Post } from "../src/index.js";

@Controller("test")
export class Test {
  // path -> /test?a=1&b=2
  @Get()
  get(ctx: Context) {
    ctx.json(ctx.query);
  }
  // path -> /test/post
  @Post("post")
  async post(ctx: Context) {
    const body = await ctx.body("json");

    ctx.json(body);
  }
  // path -> /test/rand/123
  @Get("rand/*")
  rand(ctx: Context) {
    ctx.text("hello world");
  }
  // path -> /test/123/hans
  @Get(":id/:name")
  param(ctx: Context) {
    ctx.json(ctx.params);
  }
}
