/**
 * 类型谓词 ->
 * 用于自定义类型守护
 */

export namespace Test {
  type Color = 'Red' | 'Green'

  function isColor(val: any): val is Color {
    return val === 'Red' || val === 'Green'
  }

  export function main() {
    let color: any = 'Red'
    if (isColor(color)) {
      color
    }
  }
}