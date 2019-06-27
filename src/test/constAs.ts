/**
 * const断言 ->
 * 只读断言，将任意值断言成只读类型，包括子项
 */

const x = { text: 'hello' } as const
let y = 25 as const

//关键词readonly
const testA: readonly number[] = [1, 2, 3]
const testB: readonly [number, string] = [2, 'hello']