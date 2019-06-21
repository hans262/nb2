/**
 * 条件类型 -> 
 * 
 * type Exclude<T, U> = T extends U ? never : T
 * 从T中排除那些可分配给U的类型
 * 
 * type Exclude<T, U> = T extends U ? never : T
 * 从T中提取可分配给U的类型
 * 
 * type NonNullable<T> = T extends null ? never : T
 * 从T中排除空值和未定义值
 * 
 * type ReturnType<T extends (...args: any) => any> = T extends (...args: any) => infer R ? R : any
 * 获取函数类型的返回类型
 * 
 * type InstanceType<T extends new (...args: any) => any> = T extends new (...args: any) => infer R ? R : any
 * 获取构造函数函数类型的返回类型
 * 
 * type Pick<T, K extends keyof T> = { [P in K]: T[P]; }
 * 从t中，选择一组键在联合k中的属性
 * 
 * type Partial<T> = { [P in keyof T]?: T[P]; }
 * 使T中的所有属性为可选
 * 
 */

type T00 = Exclude<"a" | "b" | "c" | "d", "a" | "c" | "f">;  // "b" | "d"
type T01 = Extract<"a" | "b" | "c" | "d", "a" | "c" | "f">;  // "a" | "c"

type T04 = NonNullable<string | number | undefined>;  // string | number

type T10 = ReturnType<() => string>;  // string

class CC { x = 0; y = 0; }
type T20 = InstanceType<typeof CC>;  // CC

type P = { name: string; age: number; location: string }
type T30 = Pick<P, "name" | "age">  //{ name: string; age: number; }

type T40 = Partial<P> //{ name?: string; age?: number; location?: string }

type T50 = Record<number | string, string>