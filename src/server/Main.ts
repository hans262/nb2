import MIDDLEWARE from '../middleware'

export function HANDLER(req: any, res: any): void {
  let i = 0
  function next(): void {
    let middleware = MIDDLEWARE[i++]
    if (!middleware) return
    middleware(req, res, next)
  }
  next()
}