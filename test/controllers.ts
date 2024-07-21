import { Controller, Context, Get, Post } from "../src/index.js";

@Controller("test")
export class Test {
  a = 2;
  // path -> /test?a=1&b=2
  @Get()
  get(ctx: Context) {
    console.log(this.a);
    // throw new Error("控制器异常");
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

@Controller("test2")
export class Test2 {
  // path -> /test2?a=1&b=2
  @Get()
  get(ctx: Context) {
    ctx.json(ctx.query);
  }
}
