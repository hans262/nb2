import { createPool, Pool, PoolConnection } from 'mysql2';

export const CONNECTION_LIMIT: number = 10
export const HOST: string = "localhost"
export const PORT: number = 3306
export const USER: string = "root"
export const PASSWORD: string = "123456"
export const DATABASE: string = "my_db"

const POOL: Pool = createPool({
	connectionLimit: CONNECTION_LIMIT,
	host: HOST,
	port: PORT,
	user: USER,
	password: PASSWORD,
	database: DATABASE,
})
/**
 * query sql
 * @param sql 
 */
export function Query<T>(sql: string): Promise<T> {
	return new Promise<T>((
		resolve: (value: T) => void,
		reject: (reason: NodeJS.ErrnoException) => void
	) => {
		POOL.getConnection((err, connection: PoolConnection) => {
			if (err) return reject(err)
			connection.query(sql, (err: NodeJS.ErrnoException, results: T) => {
				//释放
				connection.release()
				err ? reject(err) : resolve(results)
			})
		})
	})
}

/*
	type User = {
		username: string
		passwrod: string
	};
	const users: User[] = await Query<User[]>(`SELECT * FROM user ORDER BY password DESC`)
	console.log(users)
 */