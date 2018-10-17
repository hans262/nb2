const querystring=require('querystring')
const config=require('../../config/default')

class Utils{
	constructor(){
    this.CrossDomain=config.CrossDomain
	}
	static serialize(name,val,opt){
		let pairs=[name + '=' + val]
    let o=opt ? opt : {}
    if(o.maxAge) pairs.push('Max-Age='+o.maxAge)
    if(o.domain) pairs.push('Domain='+o.domain)
    if(o.path) pairs.push('Path='+o.path)
    if(o.expires) pairs.push('Expires='+o.expires.toGMTString())
    if(o.httpOnly) pairs.push('HttpOnly')
    if(o.secure) pairs.push('Secure')
    return pairs.join('; ')
	}
	static parseCookie(cookie){
		let cookies={}
    if(!cookie) return cookies
    let list=cookie.split(';')
    for(let i=0;i<list.length;i++){
      let temp=list[i].split('=')
      cookies[temp[0].trim()]=temp[1]
    }
    return cookies
	}
	static parsePostData(req){
		if(req.method!=='POST') return
    return new Promise((resolve,reject)=>{
      let str=''
      req.on('data',chunk=>str+=chunk)
      req.on('end',()=>{
        resolve(querystring.parse(str))
      })
    })
  }
  static setHeaders(res){
    res.setHeader('Server','NodeJs Server/1.0')
    res.setHeader('Vary','Accept-Encoding')
    res.setHeader('content-language','zh-CN')
    res.setHeader('X-XSS-Protection','1; mode=block')//xss安全策略
    if(config.CrossDomain){
      res.setHeader('Access-Control-Allow-Method', 'GET, POST, OPTIONS')
      res.setHeader('Access-Control-Allow-Origin', '*')
    }
  }
  static hasBody(req){
    return 'transfer-encoding' in req.headers || 'content-length' in req.headers
  }
  static parseBoundary(req){
    let contentType=req.headers['content-type']
    if(!contentType) return
    return contentType.split(';')[1].split('=')[1].trim()
  }
}
module.exports=Utils
