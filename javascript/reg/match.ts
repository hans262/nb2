/**
 * String.prototype.match(
 *  matcher: { [Symbol.match](string: string): RegExpMatchArray | null; }
 * ): RegExpMatchArray | null;
 * 
 * 匹配内容以数组返回
 * 可以是正则 ｜ 字符串
 */

namespace Test {
  console.log('hello he'.match(/he/g))
  //以什么开头
  console.log('￥100 $200 ￥300 e400'.match(/(?<=￥)\d+/g))
  console.log('￥100 $200 ￥300 e400'.match(/(?<!￥|\d)\d+/g))
  //以什么结尾
  console.log('100元 200刀 300元 400镑'.match(/\d+(?=元)/g))
  console.log('100元 200刀 300元 400镑 500'.match(/\d+(?!元|\d)/g))

}