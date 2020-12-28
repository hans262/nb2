# curl
经典的请求客户端
```
	crul http://127.0.0.1:5000

	-v 带请求头和响应头
	-i 只带响应头

	设置请求头
	curl --header "Range:0-1001" http://127.0.0.1:5000

	保存内容
	-o test.txt

	带用户验证
	-u username:password

	请求类型
	-XGET
	-XPOST
	-XDELETE
	-XPUT

	请求参数
	-d 'user=xiaoruan&age=22'
```

# ab压力测试工具

## 安装地址
http://httpd.apache.org/download.cgi
直接安装

## 测试命令
```
	ab -n 10000 -c 1000 https://baidu.com/
	-n 请求数
	-c 并发数
```
