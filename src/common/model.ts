import { Context } from "./context.js";

/**
 * 支持的请求方法
 */
export type Method = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

/**
 * 中间件类型
 */
export type Middleware = (
  ctx: Context,
  next: () => void | Promise<void>
) => Promise<void> | void;

export interface _FormData {
  name: string;
  /**文件才有，没有就是纯数据 */
  filename?: string;
  ContentType?: string;
  data: Buffer;
}

export type BodyData<T> = T extends "string"
  ? string
  : T extends "buffer"
  ? Buffer
  : T extends "json"
  ? { [key: string]: any }
  : never;
