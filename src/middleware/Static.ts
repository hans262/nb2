import { Middleware } from "../Interface/Middleware";
import { ResStatic } from "../respond/ResStatic";

export const Static: Middleware = (ctx, _) => {
  ResStatic(ctx)
}