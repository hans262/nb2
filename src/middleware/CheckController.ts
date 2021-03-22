import { API_PREFIX } from '../configure';
import CONTROLLER from '../controller';
import { isMethod } from '../Interface/Controller';
import { Middleware } from '../Interface/Middleware';
import { DEBUG } from '../modules/logger';

export const CheckController: Middleware = (ctx, next) => {
  const { req, relativePath, absolutePath, startTime } = ctx
  const { method } = req
  if (!method || !relativePath) return next()
  if (!isMethod(method)) return next()

  const prefix = relativePath.match(new RegExp('^' + API_PREFIX + '/'))
  if (!prefix) return next()

  const controller = CONTROLLER.find(c => {
    const def: boolean = c.PATH_NAME === relativePath
    const m0 = c.PATH_NAME.match(/^([^\*]+)\/\*$/)
    if (!m0) return def
    const m1 = relativePath.match(new RegExp('^' + m0[1] + '.+$'))
    return m1 ? true : def
  })

  if (!controller) return next()
  let handle = controller[method]
  if (!handle) return next()
  handle.bind(controller)(ctx)

  DEBUG({
    type: 'CONTROLLER',
    msg: absolutePath! + ' +' + (Date.now() - startTime!) + 'ms'
  })
}