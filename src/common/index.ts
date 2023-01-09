import { Context } from "../interface/Context.js"
import { Method } from "../interface/Controller.js"

export const checkReqest = (ctx: Context, opt: {
  method?: Method,
  url?: string
}) => {
  if (opt.method && opt.url) {
    return ctx.req.method === opt.method && ctx.pathname === opt.url
  }

  if (opt.method) {
    return ctx.req.method === opt.method
  }

  if (opt.url) {
    return ctx.pathname === opt.url
  }

  return false
}