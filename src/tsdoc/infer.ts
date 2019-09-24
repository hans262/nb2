/**
 * infer ->
 * 待推断的类型
 * 
 */

type PType<T extends (...arg: any) => any> = T extends (...param: infer P) => any ? P : never
type RType<T extends (...args: any) => any> = T extends (...args: any) => infer R ? R : any

type Func = (user: bigint, loc: string) => boolean
type T15 = PType<Func>
type T16 = PType<Func>[0]

type T17 = RType<Func>