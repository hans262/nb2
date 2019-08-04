import { Middleware } from "../Interface/Middleware";
import { Req } from "../Interface/Req";
import { ServerResponse } from "http";
import { ResStatic } from "../respond/ResStatic";
import { FAVION_PATH } from "../common/path";

export const ResFavicon: Middleware = function (
  req: Req, res: ServerResponse, next: Function
): void {
  const { __relativePath, method } = req
  if (method === 'GET' && __relativePath === '/favicon.ico') {
    req.__absolutePath = FAVION_PATH
    ResStatic(req, res)
  } else {
    next()
  }
}