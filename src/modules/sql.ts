import { createPool, MysqlError, Pool, PoolConnection } from 'mysql';
import { CONNECTION_LIMIT, DATABASE, HOST, PASSWORD, PORT, USER } from '../conf/mysql';

export const POOL: Pool = createPool({
	connectionLimit: CONNECTION_LIMIT,
	host: HOST,
	port: PORT,
	user: USER,
	password: PASSWORD,
	database: DATABASE,
})

export function QUERY<T>(sql: string): Promise<T> {
	return new Promise((resolve, reject) => {
		POOL.getConnection((err: MysqlError, connection: PoolConnection) => {
			if (err) return reject(err)
			connection.query(sql, (err: MysqlError, results: T) => {
				//释放
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