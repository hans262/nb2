class ResLogin{
  constructor(){
    this.method='GET'
    this.path='/login'
  }
  handler(req,res){
    res.setHeader('Content-Type','text/html; charset=utf-8')
    res.writeHead(200,'OK')
    res.end(`
      <form action="/getToken" enctype="x-www-form-urlencoded" method="post">
        Username: <input type="text" name="username">
        Password: <input type="password" name="password">
        <input type="submit">
      </form>
    `)
  }
}
module.exports=new ResLogin()