import { createPool, Pool, PoolConnection } from 'mysql2';

const POOL: Pool = createPool({
	connectionLimit: 10,
	host: "localhost",
	port: 3306,
	user: "root",
	password: "123456",
	database: "my_db",
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