/*
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
*/