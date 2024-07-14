# The Dopx

Simple Node.js services make your development more flexible.
Provide middleware and controller syntax, and route Writing method by decorator.

## Install

```sh
npm install dopx
```

## Features

- Middleware
- Controller
- Response static: Cache | Zip | Range download
- Logs

## The simple example

```ts
import { Dopx } from "dopx";

const dopx = new Dopx({ port: 8080 });

dopx.run();
```

## Use Controller

Routing syntax utilizes decorators, need to configure in tsconfig.json:

```json
{ "experimentalDecorators": true }
```

Your Controller code.

```ts
import { Controller, Context, Get, Post } from "dopx";

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
```

Install the Controller into the service.

```ts
dopx.controllers(Test);
```
