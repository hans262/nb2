const mysql = require('mysql')
const mysqlConfig = require('../../config/mysqlConfig')

class Sql {
	constructor() {
		this.createPool()
	}
	createPool() {
		if (global.POOL) return
		global.POOL = mysql.createPool({
			connectionLimit: mysqlConfig.connectionLimit,
			host: mysqlConfig.host,
			port: mysqlConfig.port,
			user: mysqlConfig.user,
			password: mysqlConfig.password,
			database: mysqlConfig.database,
		})
	}
	queryPromise(queryString) {
		return new Promise((resolve, reject) => {
			POOL.getConnection((err, connection) => {
				connection.query(queryString, (err, results, fields) => {
					connection.release()
					if (err) {
						reject(err)
					} else {
						resolve(results)
					}
				})
			})
		})
	}
}

module.exports = Sql


/*
	调用方法，匿名函数注意上一句加引号
	;(async function(){
		const sql=new Sql()
		try{
			let result=await sql.queryPromise("SELECT * FROM user")
			console.log(result)
		}catch(e){
			console.log(JSON.stringify(e))
		}
	})()
*/














