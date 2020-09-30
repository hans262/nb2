# openssl

### TLS/SSL
1.生成私钥
$ openssl genrsa -out server.key 1024
2.生成公钥
$ openssl rsa -in server.key -pubout -out server.pem

## 自建CA根证书
1.生成CA私钥
$ openssl genrsa -out ca.key 1024

2.生成CA证书请求 --需要配置openssl.cnf文件
$ openssl req -new -key ca.key -out ca.csr -config ./openssl.cnf

3.生成CA根证书
$ openssl x509 -req -in ca.csr -signkey ca.key -out ca.crt

## 用根证书签发server端证书
1.生成server私钥
$ openssl genrsa -out server.key 1024

2.生成server证书请求
$ openssl req -new -key server.key -out server.csr -config ./openssl.cnf

3.生成server证书
$ openssl x509 -req -CA ca.crt -CAkey ca.key -CAcreateserial -in server.csr -out server.crt
