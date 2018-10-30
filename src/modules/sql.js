const mysql=require('mysql')
const mysqlConfig=require('../../config/mysqlConfig')

class Sql{
	constructor(){
		if(!POOL){
			this.createPool()
		}
	}
	createPool(){
		global.POOL=mysql.createPool({
		  connectionLimit: mysqlConfig.connectionLimit,
		  host: mysqlConfig.host,
		  port: mysqlConfig.port,
		  user: mysqlConfig.user,
		  password: mysqlConfig.password,
		  database: mysqlConfig.database,
		})
	}
	queryPromise(queryString){
		return new Promise((resolve,reject)=>{
			POOL.getConnection((err,connection)=>{
				connection.query(queryString,(err,results,fields)=>{
					connection.release()
					if(err){
						reject(err)
					}else{
						resolve(results)
					}
				})
			})
		})
	}
}

module.exports=Sql



/*
	调用方法
	(async function(){
		const sql=new Sql()
		try{
			let result=await sql.queryPromise("SELECT * FROM users")
		}catch(e){
			console.log(e)
		}
	})()
	
	//全局获取，需要把连接池变成全局变量，其他页面也能获取
	调用的时候需要检测是否存在，不存在再创建
*/














