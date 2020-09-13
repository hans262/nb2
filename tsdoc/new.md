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

 