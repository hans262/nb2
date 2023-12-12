import { createPool, QueryError } from "mysql2";

const pool = createPool({
  connectionLimit: 10,
  host: "localhost",
  port: 3306,
  user: "root",
  password: "12345678",
  database: "my_db",
});

/**
 * 查询 sql
 * @param sql
 */
export function querysql<T = any>(sql: string) {
  return new Promise<T>((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) {
        connection?.release();
        return reject(err);
      }
      connection.query(sql, (err: QueryError, ret: T) => {
        //释放
        connection.release();
        err ? reject(err) : resolve(ret);
      });
    });
  });
}

/**
 * 创建数据库表
 */
export function createEntitySql() {
  /**
   * 商品
   * plan = free | buy
   * status = public | private | delete
   */
  querysql(`
    CREATE TABLE IF NOT EXISTS goods(
      id INT AUTO_INCREMENT PRIMARY KEY,
      create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      title VARCHAR(28) NOT NULL,
      uid INT NOT NULL,
      intro VARCHAR(1000),
      status VARCHAR(10) DEFAULT 'public',
      plan VARCHAR(10) DEFAULT 'free',
      price DECIMAL(10, 2) DEFAULT 0.00,
      tags JSON,
      files JSON,
      preview JSON,
      FULLTEXT (title, intro) WITH PARSER ngram
    ) CHARSET = utf8mb4;
  `);

  //用户
  querysql(`
    CREATE TABLE IF NOT EXISTS user(
      id INT AUTO_INCREMENT PRIMARY KEY,
      create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      name VARCHAR(20) NOT NULL UNIQUE,
      phone VARCHAR(11) NOT NULL UNIQUE,
      account VARCHAR(6) NOT NULL UNIQUE,
      password VARCHAR(16) NOT NULL,
      avatar VARCHAR(500),
      intro VARCHAR(100)
    ) CHARSET = utf8mb4;
  `);

  //订单
  // status = paid | unpaid
  querysql(`
    CREATE TABLE IF NOT EXISTS gorder(
      id INT AUTO_INCREMENT PRIMARY KEY,
      create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      uid INT NOT NULL,
      g_uid INT NOT NULL,
      gid INT NOT NULL,
      number VARCHAR(10) NOT NULL UNIQUE,
      amount DECIMAL(10, 2) NOT NULL,
      status VARCHAR(10) NOT NULL
    ) CHARSET = utf8mb4;
  `);

  //评论
  // 没有parent_id，为评论
  // 有parent_id，为二级回复
  // 有to_uid，在二级回复中回复某个人
  querysql(`
    CREATE TABLE IF NOT EXISTS comment(
      id INT AUTO_INCREMENT PRIMARY KEY,
      create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      content VARCHAR(1000) NOT NULL,
      gid INT NOT NULL,
      uid INT NOT NULL,
      parent_id INT,
      to_uid INT
    ) CHARSET = utf8mb4;
  `);

  //收藏、点赞
  //type = collect | like
  querysql(`
    CREATE TABLE IF NOT EXISTS collect(
      id INT AUTO_INCREMENT PRIMARY KEY,
      create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      gid INT NOT NULL,
      type VARCHAR(10) NOT NULL,
      uid INT NOT NULL
    ) CHARSET = utf8mb4;
  `);

  // 提现
  // status = progress | complete | reject
  querysql(`
    CREATE TABLE IF NOT EXISTS cashout(
      id INT AUTO_INCREMENT PRIMARY KEY,
      create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      uid INT NOT NULL,
      amount DECIMAL(10, 2) NOT NULL,
      pre_balance DECIMAL(10, 2) NOT NULL,
      after_balance DECIMAL(10, 2) NOT NULL,
      mark VARCHAR(100) DEFAULT '',
      status VARCHAR(10) DEFAULT 'progress'
    ) CHARSET = utf8mb4;
  `);

  // 关注
  querysql(`
    CREATE TABLE IF NOT EXISTS follow(
      id INT AUTO_INCREMENT PRIMARY KEY,
      create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      uid INT NOT NULL,
      to_uid INT NOT NULL
    ) CHARSET = utf8mb4;
  `);
}

/**
 * 注意事项：
 * 双引号里面不能包含双引号，可以采用外层单引号
 * 数字可以不用引号包含
 *
 * 疑问：
 * INT类型一般要给一个大小吗，id、uid、gid等
 * DECIMAL类型需要引号包含吗
 *
 */

// 新增字段
// ALTER TABLE goods ADD plan VARCHAR(10);

// 删除字段
// ALTER TABLE user DROP phone;

// 修改字段数据类型
// ALTER TABLE goods MODIFY price FLOAT;

// 修改字段名称
// ALTER TABLE gorder CHANGE uid uid INT NOT NULL;

`
  
  SELECT user.id, user.name,
  follow.id AS fid
  FROM user
  left join follow on follow.uid = 1 and follow.to_uid = user.id
  WHERE user.account = '576713';

  select * from follow;


`;
