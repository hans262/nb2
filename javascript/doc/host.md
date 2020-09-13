## 配置host加快域名解析

系统的host文件里面对应了常用的域名解析，
如果某网站有配置host域名，则不用请求域名服务器解析域名。

## 配置github 域名加快访问速度

### 找到Hosts文件位置

C:\Windows\System32\drivers\etc\hosts


### 修改配置

```
# Github
151.101.44.249 github.global.ssl.fastly.net
192.30.253.113 github.com
103.245.222.133 assets-cdn.github.com
23.235.47.133 assets-cdn.github.com
203.208.39.104 assets-cdn.github.com
204.232.175.78 documentcloud.github.com
204.232.175.94 gist.github.com
107.21.116.220 help.github.com
207.97.227.252 nodeload.github.com
199.27.76.130 raw.github.com
107.22.3.110 status.github.com
204.232.175.78 training.github.com
207.97.227.243 www.github.com
185.31.16.184 github.global.ssl.fastly.net
151.101.184.133 avatars0.githubusercontent.com
151.101.184.133 avatars1.githubusercontent.com
```

如果上述资源没有对应上，有可能github官方修改了服务器域名。
通过打开控制台查看资源加载情况，即可观察出哪些域名没有对应上。

这时候则需要去查找域名对应的ip。
可通过网站 https://baidu.com.ipaddress.com/ 搜索到域名的对应ip地址

### 刷新host
为了是host生效，
在cmd里输入如下指令
ipconfig /flushdns