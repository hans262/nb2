## mysql

### 安装教程 5.7.26解压版
```
  1.将下载包解压到指定目录
  2.配置环境变量`MYSQL_HOME=安装目录`，添加path`%MYSQL_HOME%\bin`
  3.编写my.ini文件，拷贝到安装目录
  4.安装服务`mysqld -install`
  5.初始化data目录和root用户`mysqld --initialize-insecure --user=mysql`
  6.启动服务`net start mysql`
  7.设置新密码`mysqladmin -u root -p password 新密码`，(旧密码为空，可直接回车)。
```

### 库
```
  1.查看
  SHOW DATABASES;
  2.创建
  CREATE DATABASE my_db;
  3.删除
  DROP DATABASE my_db;
```
CHARSET utf8 设置编码方式
USE my_db 选择数据库
show variables like '%char%' 查看数据库字符集

```
  数据库字符集设置什么？

```
### 表
```
  1.查看
  SHOW TABLES; 显示所有表
  DESCRIBE my_table; 显示表结构
  2.创建
  CREATE TABLE user(
    id INT auto_increment primary key,
    username varchar(255) NOT NULL UNIQUE,
    password varchar(255) NOT NULL
  )
  * DEFAULT 'Sandnes' 设置默认值
  * auto_increment 自增
  * PRIMARY KEY 主键
  * UNIQUE 唯一索引
  * NOT NULL 强制不为空
  
  3.删除
  DROP TABLE my_table;

  4.主键、索引
    主键一定是唯一性索引，唯一性索引并不一定就是主键；
    一个表中可以有多个唯一性索引，但只能有一个主键；
    主键列不允许空值，而唯一性索引列允许空值。
    
```
修改表结构
alter table my_db MODIFY id int(7) 修改表的中的一列字段类型
alter table my_db CHANGE name age int 修改字段的名称
修改表编码方式
alter table my_db character set utf8
修改一张表的所有编码格式
alter table 'db_book' convert to character set utf8;
表的编码显示
show full columns from 库名.表名;
查看表的编码
show creat table 库名.表名;
gbk_chinese_ci 支持简体繁体

### 操作user表
```
  增
    INSERT INTO user (username,password) VALUES ('tom', 123456)
  删
    DELETE FROM user WHERE username='tom'
  改
    UPDATE user SET username ='bob',password ='654321' WHERE id =01
  查
    SELECT*FROM user
```