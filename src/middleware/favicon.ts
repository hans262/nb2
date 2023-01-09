import {
  Middleware,
  FAVION_PATH
} from "../../src/index.js";
import { ResStatic } from "../respond/ResStatic.js";

export const favicon: Middleware = (ctx, next) => {
  const { pathname, req } = ctx
  const { method } = req
  if (method === 'GET' && pathname === '/favicon.ico') {
    ctx.setAbsolutePath(FAVION_PATH)
    ResStatic(ctx)
  } else {
    next()
  }
}