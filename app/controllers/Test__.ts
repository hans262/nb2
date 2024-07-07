import { Controller, Context, Get, Post } from "../../src/index.js";

@Controller("test")
export class Test__ {
  @Get()
  get(ctx: Context) {
    console.log(ctx.query);
    // ctx.url
    ctx.json({ a: 1, b: 2 });
  }

  @Post("post")
  async post(ctx: Context) {
    const body = await ctx.body("string");
    console.log(body);

    ctx.json({ a: 1, b: 3 });
  }

  @Get("jsonp")
  jsonp(ctx: Context) {
    //客户端一定要传的参数
    const callbackName = ctx.query.callback;
    //响应的数据
    const data = JSON.stringify({ a: 1, b: 2 });
    ctx.text(`${callbackName}(${data})`);
  }

  @Get("rand/*")
  rand(ctx: Context) {
    ctx.text(ctx.pathname);
  }

  @Get(":id/:name")
  param(ctx: Context) {
    ctx.json(ctx.params);
  }
}

@Controller("test2")
export class Test2__ {
  @Get("/:name/:age/opp")
  add(ctx: Context) {
    console.log(ctx.params);
    // throw new Error("错误");
    ctx.json(ctx.params);
  }
}
