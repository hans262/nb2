const mysql=require('mysql')
const mysqlConfig=require('../../config/mysqlConfig')

class Sql{
	constructor(){
		this.connectionLimit=mysqlConfig.connectionLimit
		this.host=mysqlConfig.host
		this.port=mysqlConfig.port
		this.user=mysqlConfig.user
		this.password=mysqlConfig.password
		this.database=mysqlConfig.database

		this.pool;
	}
	initPool(){
		this.pool=mysql.createPool({
		  connectionLimit: this.connectionLimit,
		  host: this.host,
		  port: this.port,
		  user: this.user,
		  password: this.password,
		  database: this.database,
		})
	}
	queryPromise(queryString){
		return new Promise((resolve,reject)=>{
			this.pool.getConnection((err,connection)=>{
				connection.query(queryString,(err,results,fields)=>{
					if(!err) resolve(results)
					else reject(err)
					connection.release()
				})
			})
		})
	}
}

module.exports=Sql


/*
	调用方法
	sql.initPool()
	sql.queryPromise("SELECT * FROM users").then(data=>{
		console.log(data)
	}).catch(err=>{
		console.log(err)
	})

	//全局获取，需要把连接池变成全局变量，其他页面也能获取
	调用的时候需要检测是否存在，不存在再创建
*/














