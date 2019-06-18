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
	return new Promise<T>((
		resolve: (value?: T | PromiseLike<T>) => void,
		reject: (reason?: MysqlError) => void
	) => {
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

; (async () => {
	type User = {
		username: string
		passwrod: string
	};
	const users: User[] = await QUERY<User[]>(`SELECT * FROM user ORDER BY password DESC`)
	console.log(users)
})()