const mysql = require('mysql')
const conf = require('../../config/mysql')
const {
	CONNECTION_LIMIT, HOST, PORT, USER, PASSWORD, DATABASE
} = conf

const POOL = mysql.createPool({
	connectionLimit: CONNECTION_LIMIT,
	host: HOST,
	port: PORT,
	user: USER,
	password: PASSWORD,
	database: DATABASE,
})

function QUERY(sql) {
	return new Promise((resolve, reject) => {
		POOL.getConnection((err, connection) => {
			if(err) return reject(err)
			connection.query(sql, (err, results, fields) => {
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

module.exports = {
	POOL,
	QUERY
}

/*
	;(async(){
		const { QUERY }=require('./sql')
		try{
			const result=await QUERY("SELECT * FROM user")
			console.log(result)
		}catch(err){
			console.log(err)
		}
	})()
*/