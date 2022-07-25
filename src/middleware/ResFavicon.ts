import { Middleware } from "../Interface/Middleware.js";
import { ResStatic } from "../respond/ResStatic.js";
import { FAVION_PATH } from "../common/path.js";

export const ResFavicon: Middleware = (ctx, next) => {
  const { relativePath, req } = ctx
  const { method } = req
  if (method === 'GET' && relativePath === '/favicon.ico') {
    ctx.setAbsolutePath(FAVION_PATH)
    ResStatic(ctx)
  } else {
    next()
  }
}