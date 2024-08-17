# 指南

## 响应静态资源

```ts
const nb = new Nb2({ port: 8080 });
nb.use(statics("/"));
nb.run();
```

## 跨域中间件

```ts
const nb = new Nb2({ port: 8080 });
nb.use(cors());
nb.run();
```
