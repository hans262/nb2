class Cache{
	constructor(cache){
		this.cache=cache
	}
	generateETag(stats){
  	const mtime=stats.mtime.getTime().toString(16)//文件最后修改时间，16进制
  	const size=stats.size.toString(16)
  	return `W/"${mtime}-${size}"`
  }
	setFreshHeaders(stats,res){
  	const lastModified=stats.mtime.toUTCString()//获取文件最后修改时间
  	if(this.cache.expires){
  		//到期日
  		const expireTime=(new Date(Date.now()+this.cache.maxAge * 1000)).toUTCString()
      res.setHeader('Expires',expireTime)
  	}
  	if(this.cache.cacheControl){
  		//范围、时效
  		res.setHeader('Cache-Control',`public, max-age=${this.cache.maxAge}`)
  	}
  	if(this.cache.lastModified){
  		//最后修改时间
      res.setHeader('Last-Modified',lastModified)
  	}
  	if(this.cache.etag){
  		//token
  		res.setHeader('ETag',this.generateETag(stats))
  	}
  }
  isFresh(req,res){
  	const reqHeaders=req.headers
  	const resHeaders=res._headers
  	const noneMatch=reqHeaders['if-none-match']//token
  	const lastModified=reqHeaders['if-modified-since']
  	if(!(noneMatch || lastModified)) return false
  	if(noneMatch && (noneMatch !== resHeaders['etag'])) return false
  	if(lastModified && lastModified !== resHeaders['last-modified']) return false
  	return true
  }
}
module.exports=Cache