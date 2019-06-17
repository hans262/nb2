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

export function QUERY(sql: string): Promise<any> {
	return new Promise<any>((resolve: (value: any) => void, reject: (value: MysqlError) => void) => {
		POOL.getConnection((err: MysqlError, connection: PoolConnection) => {
			if (err) return reject(err)
			connection.query(sql, (err: MysqlError, results:any) => {
				//释放
				connection.release()
				err ? reject(err) : resolve(results)
			})
		})
	})
}

; (async () => {
	const result: Array<any> = await QUERY('SELECT*FROM user')
	console.log(result)
	const result2: Array<any> = await QUERY('SELECT*FROM user')
	console.log(result2)
})()