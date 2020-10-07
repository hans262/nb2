/**
 * flatMap
 * 首先使用映射函数映射每个元素，
 * 然后将结果压缩成一个新数组。
 * 
 * 先map，再flat
 * 
 */

const arr = ["今天天气不错", "早上好"]

const r1=arr.map(v=>v.split(''))
console.log(r1)

const r2=arr.flatMap(v=>v.split(''))

console.log(r2)