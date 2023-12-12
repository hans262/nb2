import { Controller, Context, Get, Post, Param } from "../../src/index.js";

@Controller("test")
export class Test {
  @Get()
  get(ctx: Context) {
    ctx.statusCode(200).json({ a: 1, b: 2 });
  }

  @Post("post")
  async post(ctx: Context) {
    const body = await ctx.getBodyData("string");
    console.log(body);

    ctx.statusCode(200).json({ a: 1, b: 3 });
  }

  @Get("jsonp")
  jsonp(ctx: Context) {
    //客户端一定要传的参数
    const callbackName = ctx.url.searchParams.get("callback");
    //响应的数据
    const data = JSON.stringify({ a: 1, b: 2 });
    ctx.statusCode(200).text(`${callbackName}(${data})`);
  }

  @Get("rand/*")
  rand(ctx: Context) {
    ctx.statusCode(200).text(ctx.pathname);
  }

  @Get(":id/:name")
  param(ctx: Context, @Param() params: any) {
    ctx.statusCode(200).json(params);
  }
}

@Controller("test2")
export class Test2 {
  @Get("/:id/add")
  add(ctx: Context, @Param() params: any) {
    // console.log(0 / 3)
    throw new Error("错误");
    ctx.statusCode(200).json(params);
  }
}
