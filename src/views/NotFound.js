module.exports=(req,res)=>{
	process.send({type:'info',msg:`[process] pid: ${process.pid} -info: ReadFile NotFound`})
	res.setHeader('Content-Type','text/html; charset=utf-8')
	res.writeHead(404,'Not Found')
	res.end(`
		<h1>Not Found</h1>
		<p>The requested URL ${decodeURI(req.url)} was not found on this server.</p>
	`)
}