import { ServerResponse } from 'http';
import { Req } from '../Interface/Req';
import { LOG } from '../modules/log';

export default function ResNotFound(req: Req, res: ServerResponse): void {
  const { absolutePath, relativePath } = req
  LOG({ type: '404', msg: absolutePath })
  res.setHeader('Content-Type', 'text/html; charset=utf-8')
  res.writeHead(404, 'Not Found')
  res.end(`
		<h1>Not Found</h1>
		<p>The requested URL ${relativePath} was not found on this server.</p>
	`)
}
