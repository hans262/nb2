import CONTROLLER from '../controller/index.js';
import { isMethod } from '../interface/Controller.js';
import { Middleware } from '../index.js';
import { DEBUG } from '../modules/logger.js';

export const checkController: Middleware = (ctx, next) => {
  const { req, pathname, staticPath, startTime } = ctx
  const { method } = req
  if (!method || !pathname) return next()
  if (!isMethod(method)) return next()

  const controller = CONTROLLER.find(c => {
    const regExp = new RegExp(
      '^' + c.PATH_NAME.replaceAll('*', '([^\/]+)') + '$'
    )
    const def = pathname.match(regExp)
    return !!def
  })

  if (!controller) return next()
  let handle = controller[method]
  if (!handle) return next()
  handle.bind(controller)(ctx)

  DEBUG({
    type: 'CONTROLLER',
    msg: staticPath + ' +' + (Date.now() - startTime) + 'ms'
  })
}