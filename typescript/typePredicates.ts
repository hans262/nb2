/**
 * 类型谓词 -> Type Predicates
 * 用于自定义类型守护
 */

namespace TestTypePredicates {
  type Color = 'Red' | 'Green'

  function isColor(val: any): val is Color {
    return val === 'Red' || val === 'Green'
  }

  let color: any = 'Red'
  if (isColor(color)) {
    color
  }

}