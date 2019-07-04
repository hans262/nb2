/**
 * ReturnType ->
 * type ReturnType<T extends (...args: any) => any> = T extends (...args: any) => infer R ? R : any
 * 获取函数类型的返回类型
 */

type T10 = ReturnType<() => string>