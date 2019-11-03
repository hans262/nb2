import { Req } from "../Interface/Req";
import { ServerResponse } from "http";

export interface Controller {
  readonly PATH_NAME: string
  GET?(req: Req, res: ServerResponse): void
  POST?(req: Req, res: ServerResponse): void
  PUT?(req: Req, res: ServerResponse): void
  DELETE?(req: Req, res: ServerResponse): void
}

export type Method = 'GET' | 'POST' | 'PUT' | 'DELETE'

export function isMethod(m: any): m is Method {
  return m === 'GET' || m === 'POST' || m === 'PUT' || m === 'DELETE'
}