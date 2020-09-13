# rxjs
本文讲述rxjs的前世今生，使用它能为我们带来什么效益，在项目中我们该何时使用它。

RxJs是一个JAVASCRIPT扩展库，它使用Obervables进行反应式编程，使编写异步、回调代码更加容易。

* rxjs的诞生
* 什么是rxjs
* 响应式编程的由来
* 到底什么是响应式编程
* 什么是流
* 管道操作符的作用
* Rxjs vs Promise
* Rxjs的应用场景和未来

## OVERVIEW 概述
* Observable

|      | SINGLE   | MULTIPLE |
|------|----------|----------|
| PULL | Function | Iterator   |
| Push | Promise  | Observable |


Observables是多个值的惰性Push集合。
Observables are lazy Push collections of multiple values. They fill the missing spot in the following table:

* Observer

What is an Observer? An Observer is a consumer of values delivered by an Observable. Observers are simply a set of callbacks, one for each type of notification delivered by the Observable: next, error, and complete. The following is an example of a typical Observer object: