# TypeScript 4.2

## 更智能的类型别名
在4.2以前的版本中，始终将多个联合类型归一化为新的扁平联合类型，但是这样做会丢失类型信息。在4.2中内部结构更加智能，将跟踪类型的构造方式，返回更加智能的类型组合。这是鼠标悬停的显示效果。
```ts
type BasicPrimitive = number | string | boolean;
function doStuff(value: BasicPrimitive) {
  if (Math.random() < 0.5) {
    return undefined;
  }
  return value;
}
// 4.1 <
// function doStuff(value: BasicPrimitive): string | number | boolean | undefined
// 4.2 >
// function doStuff(value: BasicPrimitive): BasicPrimitive | undefined
```

## 元组类型的前中间...rest元素
在以前的版本中之允许rest参数位于元组的末尾，现在可以再首部和中间位置定义rest参数。有两个限制，不能有多个rest参数，且在rest参数后不能有可选参数。

```ts
let c: [string, string?] = ["hello"];
let d: [first: string, second?: string] = ["hello"];
let e: [string, string, ...boolean[]];

// 4.2
let foo: [...string[], number];
let bar: [boolean, ...string[], boolean];

// error 下面两种是不被允许的
let StealersWheel: [...Clown[], "me", ...Joker[]];
let StringsAndMaybeBoolean: [...string[], boolean?];
```

## 更加严格的in操作符
在in运算符右侧使用非对象类型是运行时错误，TypeScript4.2确保可以在开发时捕获它。
```ts
"foo" in 42;
// The right-hand side of an 'in' expression must not be a primitive.
"foo" in { 'foo': 2 };
```

## --noPropertyAccessFromIndexSignature
当访问具有索引签名的对象时，你只能使用["key"]这种方式来访问对象属性，在现在的版本中可以使用点.符号来访问，但是在某些情况下，用户希望显式选择加入索引签名，可以通过--noPropertyAccessFromIndexSignature该属性来关闭。
```ts
interface Options {
  exclude?: string[];
  [x: string]: any;
}
function doStuff(value: Options) {
  let x = value.excludes
}
```


