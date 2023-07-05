## nicest
简单的nodejs服务器库。

### 脚本
```
  npm run dev
  npm run test

  文档主页
  浏览器图标
```

## TODO
```
  服务器:
  - 实现单机多进程集群、负载均衡
  - worker进程平滑重启
  - 基于中间件的设计架构

  资源响应:
  - 静态资源加载、缓存命中、资源压缩、范围加载
  - 基于react\vue app的 history路由模式
  - 文件上传，formdata数据解析、buffer文件切割

  身份验证例子:
  - 身份验证中间件
  - 服务端Token单进程实现

  其他:
  + 实现基于TCP通信的缓存服务器，做多进程SESSION共享
  - 实现socket客户端连接池
  - 实现代理中间件
  - 实现原生websocket控件

  - 自动生成文档功能上线
  - 自动化文档部署采用Github Action实现

  Bugs:
  - socket客户端意外退出，导致服务端进程退出

  测试:
  - 日志模块编写、测试、按颜色输出日志
  - 设计单元测试模块
  - 日志模块改用标准输出流
  - 自动化文档部署采用Github Action实现
  - 日志增加当前接口消耗毫秒数
```