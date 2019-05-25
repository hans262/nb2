import { MIDDLEWARE } from '../store/MIDDLEWARE'

export function HANDLER(req, res): void {
  let i = 0
  function next() {
    let middleware = MIDDLEWARE[i++]
    if (!middleware) return
    middleware(req, res, next)
  }
  next()
}