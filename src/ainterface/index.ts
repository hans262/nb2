import { Context } from "./Context.js";

export interface Middleware {
  (ctx: Context, next: () => void): void
}