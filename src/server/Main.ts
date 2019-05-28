import { IncomingMessage, ServerResponse } from 'http';
import MIDDLEWARE from '../middleware';

export function HANDLER(req: IncomingMessage, res: ServerResponse): void {
  let i = 0
  function next(): void {
    const middleware: Function = MIDDLEWARE[i++]
    if (!middleware) return
    middleware(req, res, next)
  }
  next()
}