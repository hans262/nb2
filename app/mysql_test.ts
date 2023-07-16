import { createPool, QueryError } from 'mysql2';

export const pool = createPool({
  connectionLimit: 10,
  host: "localhost",
  port: 3306,
  user: "root",
  password: "12345678",
  database: "my_db",
})

/**
 * 查询 sql
 * @param sql 
 */
export function querysql<T>(sql: string) {
  return new Promise<T>((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) {
        connection?.release()
        return reject(err)
      }
      connection.query(sql, (err: QueryError, ret: T) => {
        //释放
        connection.release()
        err ? reject(err) : resolve(ret)
      })
    })
  })
}

// querysql<{
//   username: string
//   passwrod: string
// }[]>(`SELECT * FROM user ORDER BY password DESC`).then(ret => {
//   console.log(ret)
// })