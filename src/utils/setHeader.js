const conf=require('../../config/default')
const { CROSS }=conf

function setHeader(res){
  res.setHeader('Server','NodeJs Server/1.0')
  res.setHeader('content-language','zh-CN')
  res.setHeader('Vary','Accept-Encoding')
  res.setHeader('X-XSS-Protection','1; mode=block')//xss安全策略
  if(CROSS){
    res.setHeader('Access-Control-Allow-Method', 'GET, POST, OPTIONS')
    res.setHeader('Access-Control-Allow-Origin', '*')
  }
}
module.exports=setHeader