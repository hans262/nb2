# Typescript 相关问题

## 什么是Typescript?
由微软开发的一款编程语言，为js提供静态类型检查，开发者可通过微软的一系列措施平滑过渡到ts。它是js的强类型超集，编译后能生成js代码。

## TypeScript和JavaScript有什么差异？
 * 扩展名    .js  / .ts
 * ES支持    支持最新语法(有编译阶段)  / 很难支持最新语法
 * 强类型    无类型 动态类型
 * 支持模块  不支持模块

## 我们为什么需要TypeScript？
 * 易于维护 静态类型检查 可在编码阶段监察出大量错误
 * 是js的超集，支持最新语法，因为有编译阶段，可解决支持问题。
 * 支持更多新的语法，让程序员保持最新状态，不用为兼容这种毫无技术层次的东西折磨
 * 程序员的关注度 转向 程序逻辑，而不再是考虑兼容

## 列出Typescript的一些特性
 * 3.7 可选链的支持
 * 类型映射 keyof
 * 条件类型 类型三元操作
 * 类型约束 extends
 * 类型运算 等

## 列出使用Typescript的一些优点?

## Typescript的缺点是什么?
 * 编译时间过长问题，以后会越来越大，
 * 当然微软也一直在致力于解决这方面的问题
 * 安装包的时候 需要安装类型包 比如 @types/react
 * 这是遗留问题，等到以后所有的包都自动包含自己的类型的时候
 * 或者以后包的作者都使用ts编写包，就不存在这个问题了

## Typescript是谁开发的，目前稳定的Typescript版本是什么？
 * 作者：安德森.海森搏格  他的其他作品：c#
 * 3.6 3.7@latast 3.8

## 说说安装Typescript的最低要求。或者我们如何获得TypeScript并安装它？
 * 需要nodejs的编译支持
 * npm 包管理器

## 解释TypeScript中的泛型？
 * 把类型当参数传递

## readonly 和 const 有什么区别？
 * readonly  标记只读
 * const  不能重新赋值 常量 固定的值

## 什么是 never 类型？
 * 那些永远不会有返回值的类型，比如异常抛出的函数
 * function testww(): never { throw new Error('dwq') }

## void 和 undefined 有什么区别？
 * void 代表没有任何类型  通常用于无返回值的函数
 * undefined 未定义的类型 可赋值给void类型

## 什么是 Abstract Class？
 * 抽象类 不能实例化（new）,可描述类的详细信息，构造函数、成员、成员方法等。

## typeof 关键词有什么用？
 * 用于类型守卫，可用于静态检查，以确保某个作用域里的类型

## keyof 关键词有什么用？
 * 映射类型，获取对象类型的所有属性的字面量的联合类型

## 下面代码中，foo 的类型如何声明
```ts
const foo = new Map();
type foo = InstanceType<typeof Map>
```
## Ts 拥有重载功能
```ts
function Component <U extends Vue>(options: ComponentOptions<U>): <V extends VueClass>(target: V) => V
function Component <V extends VueClass>(target: V): V
```

## 类型声明里 「&」和「|」有什么作用？
 * 「&」 交叉类型  取两个类型的交集

## 下面代码里「date is Date」有什么作用？
 * 类型谓词  用于自定义的类型守卫  类似于typeof instanceof

## tsconfig.json 里 --strictNullChecks 参数的作用是什么？
 * 用于代码静态检查  在严格的null检查模式  ts后续版本用strict 替代，包含了strictNullChecks功能

## interface 和 type 声明有什么区别？
 * interface  接口  可描述 对象 函数 类  早期的类型描述
 * type 定义类型  可描述任意类型  字符串字面量类型 等
 *
##  如何完善 Calculator 的声明。
```ts
interface Calculator { (nu: number): Oj }
type Oj = { multiply: (a: number) => Oj; add: (b: number) => Oj }
let calcu: Calculator;
calcu(2).multiply(5)
```

## declare 关键字有什么用？
声明全局类型

## 如何处理才能在 TS 中引用 CSS 或者 图片使之不报错？
ts只能处理js代码，处理css 图片等  需要其他工具，如 babel webpack 等

## namespace 和 module 有什么区别
 * namespace 命名空间
 * module 模块

# 前端面试题

## 什么是跨域？
 - 同一域名下发生ajax通信，协议、域名、端口三者有一个不同浏览器就认定为跨域。
 - 览为何设置跨域阻拦：基于用户安全考虑。
 - 解决跨域方案：
 1. 后端设置响应头 response.setHeader("Access-Control-Allow-Origin", "http://www.domain1.com")
 2. 父子窗口通信 window.postMessage()
 3. JSONP 利用script标签自带跨域特性，缺点：后端需要单独配置跨域接口。

## 什么是闭包？
 - 绑定了执行环境的函数
 - 外部函数执行完后，闭包依然存在

## 浏览器缓存方案
 - localstorage 持久、存在于当前页面
 - sessionstorage 非持久、页面关闭、清除缓存
 - cookies 持久、存在于同域名下
 - indexDB 内存大、持久的前端数据库

## new操作符做了什么？
 - 创建一个对象，使当前作用域this指向该对象。
 - 属性、方法被添加到对象中。
 - 最后返回该this对象。

## call()和apply()的区别
 - 都是原型函数下的方法
 - 提供原函数的this属性继承


 ## 问面试官的话
- 你觉得，这本工作所需的能力，我还有哪些不具备？
- 在你看来，这个岗位在公司内部的发展如何？
- 我想知道目前这个岗位主要的职责是什么。
- 我有着TypeScript的能力，不知道在贵公司能否用的上？
- 您认为考核这个岗位员工的最重要指标有哪些？
- 为了胜任这个岗位我还需要学习哪些技术知识？

## 薪资福利加班
- 谈论这个话题，请在确认大概率通过的前提

## 加班情况
- 请问公司上个月加班情况
- 加班是否是强制加班、加班是否提供加班工资
- 一般加班，时间是如何安排的，比如从多久开始多久结束
- 节假日是否正常放假

## 福利
- 公司是否缴纳公积金、社保
- 年终奖是否拥有、按照什么比例结算
- 公司有年假吗

