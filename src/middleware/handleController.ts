import { isMethod } from '../interface/Controller.js';
import { Middleware, Controller } from '../index.js';
import { stdlog } from '../common/logger.js';

export const handleController = (cs: Controller[]): Middleware => {
  return (ctx, next) => {
    const { req, pathname, startTime } = ctx
    const { method } = req
    if (!method || !pathname) return next()
    if (!isMethod(method)) return next()

    const controller = cs.find(c => {
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

    stdlog({
      type: 'controller',
      msg: pathname + ' +' + (Date.now() - startTime) + 'ms',
      color: 'cyan'
    })
  }
}