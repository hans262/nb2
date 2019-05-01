const fs=require('fs')
const ResNotFound=require('../respond/ResNotFound')
const ResDir=require('../respond/ResDir')
const ResFile=require('../respond/ResFile')

function ResStatic(req, res, next) {
  const { absolutePath } = req
  
  fs.stat(absolutePath, (err, stats) => {
    if (err) {
      return ResNotFound(req,res)
    }
    
    req.stats=stats

    if (stats.isDirectory()) {
      return ResDir(req,res)
    }

    if(stats.isFile()){
      return ResFile(req,res)
    }
    
  })

}
module.exports = ResStatic