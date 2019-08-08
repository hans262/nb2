const combineMiddleware = <T>(...middleware: (T | null)[]): T[] =>
  middleware.filter((m: T | null): m is T => m !== null)