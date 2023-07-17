## nicest
简单的nodejs服务。

## 脚本
```sh
  # 启动主进程
  npm run dev
  # 测试
  npm run test
```

## TODO
```
  服务:
  - 中间件、控制器
  - 静态资源响应：缓存、资源压缩、范围下载
  - 前端路由控制，react\vue
  - socket服务端
  - websocket服务端
  - 日志模块

  例子：
  - 文件上传，formdata数据解析、buffer文件切割
  - 身份Token验证，目前token在多进程中没有共享
  - 代理中间件

  功能：
  - 自动生成文档
  - 文档自动化部署到gh-pages，Github Action实现
  
  问题：
  + socket客户端意外退出，导致服务端进程退出
```