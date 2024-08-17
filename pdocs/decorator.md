# 装饰器

装饰器是 TypeScript 提供的一种强大特性，它允许我们在编译时向类、方法、属性或参数添加元数据。在此框架中，装饰器主要用于定义路由和 HTTP 方法，这极大地简化了路由的配置过程，使路由定义更加直观和灵活。

要在你的项目中使用装饰器，你需要在你的 tsconfig.json 文件中配置：

```json
{ "experimentalDecorators": true }
```

## 装饰器预览

- @Controller
- @Get | @Post | @Put | @Delete | @Patch
- @Use

### `@Controller`

- **用途**: 定义一个控制器类，控制器类是处理 HTTP 请求的主要载体。
- **参数**: 路由的前缀，即所有属于此控制器的路由都将共享的公共路径段。

```ts
@Controller("test")
export class Test {}
```

- 安装控制器到 app 服务中：

```ts
app.use(controllers("/api", Test));
```

### `@Get, @Post, @Put, @Delete, @Patch`

- **用途**: 定义控制器方法对应的 HTTP 请求类型。
- **参数**: 路由的后半段，即具体方法的路径。

```ts
  @Get("post")
  handle(ctx: Context) {}
```

- 路径匹配规则:

  - 动态参数: 使用冒号:来表示动态参数，例如`@Get(":id")`。
  - 通配符路径: 使用星号*来捕获剩余路径，例如`@Get("*")`。

- 示例

```ts
@Controller("test")
export class Test {
  // GET 请求，路径为 /test
  @Get()
  [sfn()](ctx: Context) {
    console.log(this.a);
    ctx.json(ctx.query);
  }

  // POST 请求，路径为 /test/post
  @Post("post")
  [sfn()](ctx: Context) {
    const body = await ctx.body("json");
    ctx.json(body);
  }

  // GET 请求，路径为 /test/rand/123
  @Get("rand/*")
  [sfn()](ctx: Context) {
    ctx.text("hello world");
  }

  // GET 请求，路径为 /test/123
  @Get(":id")
  [sfn()](ctx: Context) {
    ctx.json(ctx.params);
  }
}
```

### `@Use`

如何在 RESTful API 控制器中使用 AOP 来添加横切关注点逻辑。

```ts
@Controller("test")
export class Test {
  @Use(async (ctx, next) => {
    console.log("before");
    await next();
    console.log("after");
  })
  @Get()
  async [sfn()](ctx: Context) {
    ctx.json(ctx.query);
  }
}
```