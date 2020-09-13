/**
 * String.match(reg:RegExp):Array<string>|null
 * 匹配到类容，返回数组
 * 
 */

//正向
// console.log('￥100 $200 ￥300 e400'.match(/(?<=￥)\d+/g))
// console.log('￥100 $200 ￥300 e400'.match(/(?<!￥|\d)\d+/g))
//反向
// console.log('100元 200刀 300元 400镑'.match(/\d+(?=元)/g))
// console.log('100元 200刀 300元 400镑 500'.match(/\d+(?!元|\d)/g))

console.log('hello he'.match(/he/g))