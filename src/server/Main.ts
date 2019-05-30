import { IncomingMessage, ServerResponse } from 'http';
import { Middleware } from '../Interface/Middleware';
import MIDDLEWARE from '../middleware';

export function HANDLER(req: IncomingMessage, res: ServerResponse): void {
  let i = 0
  function next(): void {
    const middleware: Middleware = MIDDLEWARE[i++]
    if (!middleware) return
    middleware(req, res, next)
  }
  next()
}