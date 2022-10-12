import { Middleware } from "../../src/index.js";
import { ResStatic } from "../../src/respond/ResStatic.js";

export const Static: Middleware = (ctx, _) => {
  ResStatic(ctx)
}