import { LOG } from '../modules/log'

export default function ResNotFound(req: any, res: any) {
  const { absolutePath } = req
  LOG({ type: '404', msg: absolutePath })
  res.setHeader('Content-Type', 'text/html; charset=utf-8')
  res.writeHead(404, 'Not Found')
  res.end(`
		<h1>Not Found</h1>
		<p>The requested URL ${req.relativePath} was not found on this server.</p>
	`)
}
