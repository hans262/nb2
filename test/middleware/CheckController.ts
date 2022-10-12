import CONTROLLER from '../../src/controller/index.js';
import { isMethod } from '../../src/interface/Controller.js';
import { Middleware } from '../../src/index.js';
import { DEBUG } from '../../src/modules/logger.js';

export const CheckController: Middleware = (ctx, next) => {
  const { req, pathname, absolutePath, startTime } = ctx
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
    msg: absolutePath + ' +' + (Date.now() - startTime) + 'ms'
  })
}