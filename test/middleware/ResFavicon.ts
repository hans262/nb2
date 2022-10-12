import {
  Middleware,
  FAVION_PATH, ResStatic
} from "../../src/index.js";

export const ResFavicon: Middleware = (ctx, next) => {
  const { pathname, req } = ctx
  const { method } = req
  if (method === 'GET' && pathname === '/favicon.ico') {
    ctx.setAbsolutePath(FAVION_PATH)
    ResStatic(ctx)
  } else {
    next()
  }
}