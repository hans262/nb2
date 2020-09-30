### SELECT 用于从表中选取数据
* 返回当前列的数据
  SELECT 列名 FROM 表名

* 返回所有列的数据
  SELECT * FROM 表名

### DISTINCT 返回去重的列
SELECT DISTINCT 列名 FROM 表名称

### WHERE 条件查询
SELECT 列名 FROM 表名 WHERE 列 运算符 值
值使用单引号，如果是数字不要使用引号

* 操作符
```
  =
  <>        不等于(可以写为 !=)
  >         
  >=
  <=
  BETWEEN   范围
  LIKE      搜索某种模式
```


### AND/OR 连接多个条件

SELECT * FROM Persons WHERE FirstName='Thomas' AND LastName='Carter'
SELECT * FROM Persons WHERE (FirstName='Thomas' OR FirstName='William') AND LastName='Carter'

### ORDER BY 排序

升序
SELECT * FROM user ORDER BY password
降序
SELECT * FROM user ORDER BY password DESC

### LIMIT 返回条数
