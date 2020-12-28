# shell

ls //显示文件
mkdir [文件夹名] //创建文件夹
rm [文件名] //删除文件
rm -rf [文件夹名] //直接删除
nohup node app.js & //后台运行程序

cp [文件名] [路径] 复制文件到路径
mv [文件名] [路径] 移动文件到路径

echo 'hello world' > a.txt //创建文件

pwd //显示目录路径

cat [文件名] //显示文件类容

ps -ef //查看进程

kill -9 [pid] //杀死进程


# ssh

* 登陆
ssh 用户@ip -p 端口
如果有密码，会提示让输入密码

实例
ssh root@94.191.35.215 -p 22

id_dsa         -->私钥(钥匙)
id_dsa.pub     -->公钥(锁)

# rmate

linux 服务器安装 rmate

wget https://raw.githubusercontent.com/sclukey/rmate-python/master/bin/rmate
chmod +x ./rmate
mv ./rmate /usr/local/bin/rmate

本地

先ssh登陆
再执行命令
rmate -p 52698 file