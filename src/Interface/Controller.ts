import { Context } from "./Context";

export interface Controller {
  readonly PATH_NAME: string
  GET?(ctx: Context): void
  POST?(ctx: Context): void
  PUT?(ctx: Context): void
  DELETE?(ctx: Context): void
}

export type Method = 'GET' | 'POST' | 'PUT' | 'DELETE'

export function isMethod(m: string): m is Method {
  return m === 'GET' || m === 'POST' || m === 'PUT' || m === 'DELETE'
}