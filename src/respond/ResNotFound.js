
function ResNotFound(req,res){
  process.send({
		type: 'INFO',
    pid: process.pid,
    msgtype: '404',
    msg: req.absolutePath
  })
  res.setHeader('Content-Type','text/html; charset=utf-8')
	res.writeHead(404,'Not Found')
	res.end(`
		<h1>Not Found</h1>
		<p>The requested URL ${req.relativePath} was not found on this server.</p>
	`)
}

module.exports=ResNotFound
