## issues

### 压缩资源
```
  设置Content-Length后，如果资源压缩后再发送，则显示不正常，
  原因：浏览器对Content-Length要求是实际size，压缩后无法获取文件真实大小size
  目前解决方案：在压缩处，删除content-Length头
```

### 多进程集群
```
  现阶段SESSION存在每个进程中，导致切换进程后，SESSION无法同步。
  可解决方案：使用Redis做SESSION存储，或使用文件存储，或数据库存储
  目前还没实现
```

### typescript重构
```
  stage === 3
```