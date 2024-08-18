import { Controller, Context, Get, Post, sfn, Use } from "../src/index.js";

@Controller("test")
export class Test {
  count = 0;

  @Use((ctx, next) => {
    console.log("before");
    // throw new Error("拦截器异常");
    next();
    console.log("after");
  })
  @Get()
  async [sfn()](ctx: Context) {
    console.log(this.count++);
    // throw new Error("控制器异常");
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

  @Get("item/:id")
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

  @Get("jsonp")
  [sfn()](ctx: Context) {
    //客户端一定要传的参数
    const cbname = ctx.query.cbname;
    //响应的数据
    const data = JSON.stringify({ a: 1, b: 2 });
    //客户端拿到结果后，用eval去执行这段代码
    ctx.text(`${cbname}(${data})`);
  }

  @Get("shutdown")
  [sfn()](ctx: Context) {
    ctx.text(`服务即将关闭！`);
    ctx.app.close();
  }

  @Get("restart")
  [sfn()](ctx: Context) {
    ctx.text(`服务正在重启！`);
    process.send?.("restart");
  }
}
