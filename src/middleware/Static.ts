import { Middleware } from "../Interface/Middleware.js";
import { ResStatic } from "../respond/ResStatic.js";

export const Static: Middleware = (ctx, _) => {
  ResStatic(ctx)
}