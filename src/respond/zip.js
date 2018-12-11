const zlib=require('zlib')
const path=require('path')
const fs=require('fs')

class Zip{
  constructor(zipMatch){
    this.zipMatch=zipMatch
  }
  isZipShould(absolutePath){
    const type=path.extname(absolutePath)
    const matched=type.match(this.zipMatch)//压缩范围
    return matched
  }
  compressHandle(req,res,raw,statusCode,reasonPhrase){
    var stream=raw
    if(this.isZipShould(req.absolutePath)){
      process.send({
        type: 'info',
        pid: process.pid,
        msgtype: 'info',
        msg: 'ReadFile IsZiped'
      })
      const acceptEncoding=req.headers['accept-encoding'] ? req.headers['accept-encoding'] : ''
      if(acceptEncoding.match(/\bgzip\b/)){
        res.setHeader('Content-Encoding','gzip')
        stream=raw.pipe(zlib.createGzip())
      }else if(acceptEncoding.match(/\bdeflate\b/)){
        res.setHeader('Content-Encoding','deflate')
        stream=raw.pipe(zlib.createDeflate())
      }
    }else{
      res.setHeader('Content-Length',req.stats.size)
      process.send({
        type: 'info',
        pid: process.pid,
        msgtype: 'info',
        msg: 'ReadFile NotZiped'
      })
    }
    res.writeHead(statusCode,reasonPhrase)
    stream.pipe(res)
  }
  respond(req,res){
    if(req.headers['range']){
      var range=this.parseRange(req.headers['range'],req.stats.size)
      if(range){
        process.send({
          type: 'info',
          pid: process.pid,
          msgtype: 'info',
          msg: `ReadRange ${range.start}-${range.end}`
        })
        // bytes 0-100/9193
        res.setHeader('Content-Range','bytes=' + range.start + '-' + range.end + '/' + req.stats.size)
        res.setHeader('Content-Length',(range.end - range.start + 1))
        var raw=fs.createReadStream(req.absolutePath,{'start': range.start,'end': range.end})
        this.compressHandle(req,res,raw,206,'Partial Content')
      }else{
        process.send({
          type: 'info',
          pid: process.pid,
          msgtype: 'info',
          msg: `ReadRange 416`
        })
        res.removeHeader('Content-Length')
        res.setHeader('Content-Range', `bytes=*/${req.stats.size}`)
        res.writeHead(416,'Request Range Not Satisfiable')
        res.end()
      }
    }else{
      var raw=fs.createReadStream(req.absolutePath)
      this.compressHandle(req,res,raw,200,'OK')
    }
  }
  parseRange(str,size){
    if(str.includes(',')) {
      return
      //只处理一个分段的情况
      //多个分段 Range:0-255[,256-511]
    }
    var range=str.split('-'),
      start=parseInt(range[0]),
      end=parseInt(range[1])
    // Case: -end
    if(isNaN(start)){
      console.log()
      if(end>size){
        start=0
      }else{
        start = size - end
      }
      end = size - 1
    // Case: start-
    }else if(isNaN(end)){
      if(start>=size) start=size - 1
      end = size - 1
    }
    // Invalid
    if (start > end || end > size) {
      return
    }
    return {start,end}
  }
}
module.exports=Zip



