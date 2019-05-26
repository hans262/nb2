import CONTROLLER from '../controller'

export default function CheckController(req: any, res: any, next: Function) {
  const { method, relativePath } = req
  const Con = CONTROLLER.find(v => v.PATH === relativePath)
  if (!Con || !Con.prototype[method]) return next()
  const r0 = new Con()
  r0[method](req, res)
}