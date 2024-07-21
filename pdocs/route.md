# 构建路由系统

## 装饰器简介

装饰器是 TypeScript 提供的一种强大特性，它允许我们在编译时向类、方法、属性或参数添加元数据。在我们的框架中，装饰器主要用于定义路由和 HTTP 方法，这极大地简化了路由的配置过程，使路由定义更加直观和灵活。

要在你的项目中使用装饰器，你需要在你的 tsconfig.json 文件中配置：

```json
{ "experimentalDecorators": true }
```

### `@Controller`

- **用途**: 定义一个控制器类，控制器类是处理 HTTP 请求的主要载体。
- **参数**: 路由的前缀，即所有属于此控制器的路由都将共享的公共路径段。
- **示例**:

```ts
@Controller("test")
export class Test {}
```

### `@Get, @Post, @Put, @Delete, @Patch`

- **用途**: 定义控制器方法对应的 HTTP 请求类型。
- **参数**: 路由的后半段，即具体方法的路径。
- **示例**:

```ts
  @Get("post")
  handle(ctx: Context) {}
```

- 控制器定义规则

控制器是路由处理的核心，每个控制器类都应使用@Controller 装饰器进行标记，以指定其基础路径。控制器中的每个方法则应使用@Get, @Post, 等装饰器来指定其处理的 HTTP 请求类型和路径。

- 路径匹配规则

  - 动态参数: 使用冒号:来表示动态参数，例如@Get(":id")。
  - 通配符路径: 使用星号*来捕获剩余路径，例如@Get("*")。

- 示例

```ts
@Controller("test")
export class Test {
  // GET 请求，路径为 /test
  @Get()
  get(ctx: Context) {
    console.log(this.a);
    ctx.json(ctx.query);
  }

  // POST 请求，路径为 /test/post
  @Post("post")
  post(ctx: Context) {
    const body = await ctx.body("json");
    ctx.json(body);
  }

  // GET 请求，路径为 /test/rand/123
  @Get("rand/*")
  rand(ctx: Context) {
    ctx.text("hello world");
  }

  // GET 请求，路径为 /test/123
  @Get(":id")
  param(ctx: Context) {
    ctx.json(ctx.params);
  }
}
```

### 安装控制器

使用 app.controllers 函数可以批量安装控制器类，指定控制器的前缀，从而构建完整的路由系统。

- 示例

```ts
app.controllers("/api", Test);
app.controllers("/admin", Test2, Test3, ...);
```

以上文档详细介绍了如何使用装饰器来定义路由，以及如何组织和安装控制器类，帮助用户快速上手并构建出高效、可扩展的路由系统。
