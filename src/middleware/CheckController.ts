import CONTROLLER from '../controller'
import { Req } from '../Interface/Req';
import { ServerResponse } from 'http';

export default function CheckController(req: Req, res: ServerResponse, next: Function): void {
  const { method, relativePath } = req
  const Con = CONTROLLER.find(v => v.PATH === relativePath)
  if (!Con || !Con.prototype[method]) return next()
  const r0 = new Con()
  r0[method](req, res)
}