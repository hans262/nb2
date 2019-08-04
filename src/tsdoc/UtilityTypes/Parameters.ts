/**
 * Parameters ->
 * type Parameters<T extends (...args: any) => any> = T extends (...args: infer P) => any ? P : never
 * 获取函数参数的类型，以元组返回
 */

type Props = {
  name: string
}
function M(props: Props): void { }
type T24 = Parameters<typeof M>