import { createPool, Pool } from 'mysql'
import { CONNECTION_LIMIT, HOST, PORT, USER, PASSWORD, DATABASE } from '../conf/mysql'

export const POOL: Pool = createPool({
	connectionLimit: CONNECTION_LIMIT,
	host: HOST,
	port: PORT,
	user: USER,
	password: PASSWORD,
	database: DATABASE,
})

export function QUERY(sql: string): Promise<{}> {
	return new Promise((resolve, reject) => {
		POOL.getConnection((err, connection) => {
			if (err) return reject(err)
			connection.query(sql, (err, results) => {
				//释放连接
				connection.release()
				err ? reject(err) : resolve(results)
			})
		})
	})
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