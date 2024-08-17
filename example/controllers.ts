import { Controller, Context, Get, Post, sfn, Use } from "../src/index.js";

@Controller("test")
export class Test {
  a = 2;

  @Use((ctx, next) => {
    console.log("before");
    // throw new Error("拦截器异常");
    next();
    console.log("after");
  })
  @Get()
  async [sfn()](ctx: Context) {
    console.log(this.a);
    throw new Error("控制器异常");
    ctx.json(ctx.query);
  }

  @Post("post")
  async [sfn()](ctx: Context) {
    const body = await ctx.body("json");

    ctx.json(body);
  }

  @Get("rand/*")
  [sfn()](ctx: Context) {
    ctx.text("hello world");
  }

  @Get(":id/:name")
  [sfn()](ctx: Context) {
    ctx.json(ctx.params);
  }
}

@Controller("test2")
export class Test2 {
  @Get()
  [sfn()](ctx: Context) {
    ctx.json(ctx.query);
  }
}
