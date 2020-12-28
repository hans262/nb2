## HOST
主机地址，host是主机地址，当访问一个域名的时候，
需要先访问域名服务器解析成ip地址再访问主机。

系统的host文件里面对应了常用的域名解析，
如果某网站有配置host域名，则不用请求域名服务器解析域名。

## 配置github host 加快访问速度

### Hosts文件位置
window: C:\Windows\System32\drivers\etc\hosts

### 如何修改
```
# Github
140.82.114.3 github.com
# Baidu
39.156.69.79 baidu.com
```
如果资源没有对应上，有可能ip地址不正确。
打开控制台查看资源加载情况，即可查出哪些域名没有对应上。

这时候则需要去查找域名对应的ip。
可通过网站host查询 对应 ip地址。

### 刷新host
修改host后，需要刷新host。
cmd: ipconfig /flushdns