/**
 * InstanceType ->
 * type InstanceType<T extends new (...args: any) => any> = T extends new (...args: any) => infer R ? R : any
 * 获取构造函数函数类型的返回类型
 */

class CC { x = 0; y = 0; }
type T20 = InstanceType<(typeof CC)>