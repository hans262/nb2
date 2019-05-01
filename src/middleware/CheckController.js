const { CONTROLLER }=require('../store/CONTROLLER')

function CheckController(req,res,next){
  const { method, relativePath } = req
  const con=CONTROLLER.filter(c=>c.method === method && c.path === relativePath)
  if(con.length){
    const { handler }=con[0]
    handler(req,res)
  }else{
    next()
  }
}
module.exports=CheckController