# The Nb2

Simple Node.js services make your development more flexible.
Provide middleware and controller syntax, and route Writing method by decorator.

## Install

```sh
npm install nb2
```

## Features

- Middleware
- Controller
- Decorator route
- Response static: Cache | Zip | Range

## The simple example

```ts
import { Nb2 } from "nb2";
const app = new Nb2({ port: 8080 });
app.run();
```

## Use Controller

Routing syntax utilizes decorators, need to configure in tsconfig.json:

```json
{ "experimentalDecorators": true }
```

Your Controller code.

```ts
import { Controller, Context, Get, Post } from "nb2";

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

  // path -> /test/123
  @Get(":id")
  param(ctx: Context) {
    ctx.json(ctx.params);
  }
}
```

Install the Controller into the service.

```ts
import { controllers } from "nb2";

app.use(controllers("/api", Test));
app.use(controllers("/admin", Test2, Test3, ...));
```
