import { Middleware } from "../index.js";
import { ResStatic } from "../respond/ResStatic.js";

export const statics: Middleware = (ctx, _) => {
  ResStatic(ctx)
}