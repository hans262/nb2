import { Context } from '../Interface/Context';
import { DEBUG } from '../modules/logger';

export function ResNotFound(ctx: Context) {
  const { absolutePath, relativePath, startTime,res } = ctx
  res.setHeader('Content-Type', 'text/html; charset=utf-8')
  res.writeHead(404, 'Not Found')
  res.end(`
  	<h1>Not Found</h1>
  	<p>The requested URL ${relativePath} was not found on this server.</p>
  `)
  DEBUG({ 
    type: 'RES_404', 
    msg: absolutePath! + ' +' + (Date.now() - startTime!) + 'ms'
  })
}
