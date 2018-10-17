const mysql=require('mysql')

/*
{ createConnection: [Function: createConnection],
  createPool: [Function: createPool],
  createPoolCluster: [Function: createPoolCluster],
  createQuery: [Function: createQuery],
  escape: [Function: escape],
  escapeId: [Function: escapeId],
  format: [Function: format],
  raw: [Function: raw] }
*/


const connection=mysql.createConnection({
	host:'localhost',
  port:'3306',
	user:'root',
	password:'5276',
	database:'myapp'
})
connection.connect()

connection.query('SELECT * FROM users', function (error, results, fields){
  if (error) console.log(error)
  console.log(results)
})

connection.end(err=>{if(err) console.log(err)})//此关闭有err回掉函数
// connection.destroy()//此关闭没有任何事件触发，直接关闭






/*
const pool=mysql.createPool({
  connectionLimit: 10,
  host:'localhost',
  port:'3306',
  user:'root',
  password:'5276',
  database:'myapp'
})

pool.query('SELECT * FROM users', function (error, results, fields){
  if (error) console.log(error)
  console.log(results)
})
*/


/*

const pool=mysql.createPool({
  connectionLimit: 10,//一次创建最大连接数
  host:'localhost',
  port:'3306',
  user:'root',
  password:'5276',
  database:'myapp'
})

pool.getConnection((err,connection)=>{
  if(err) throw err //没连接
  connection.query('SELECT * FROM users', function (error, results, fields){
    connection.release()//释放连接，回到池子中
    // 如果想将这个连接销毁，请使用connection.destroy()
    if (error) throw error //释放后处理错误
    console.log(results)
  })
})


//监听拿到连接
pool.on('acquire', function (connection) {
  console.log('Connection %d acquired', connection.threadId)
})

//监听建立新连接时
pool.on('connection', function (connection) {
  connection.query('SET SESSION auto_increment_increment=1')
})

//监听 拿连接需排队时
pool.on('enqueue', function () {
  console.log('Waiting for available connection slot')
})

//监听释放回池时
pool.on('release', function (connection) {
  console.log('Connection %d released', connection.threadId);
})

//关闭池中的所有连接
pool.end(function (err) {
  // all connections in the pool have ended
  console.log('所有连接已关闭')
});
*/