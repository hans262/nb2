import { Middleware } from "../Interface/Middleware";
import { ResStatic } from "../respond/ResStatic";
import { FAVION_PATH } from "../common/path";

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