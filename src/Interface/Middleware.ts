import { Context } from "./Context";

export interface Middleware {
  (ctx: Context, next: () => void): void
}