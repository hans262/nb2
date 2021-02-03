/**
 * 对url进行编码的两种方式
 */

const myUri='http://www.w3school.com.cn/我的文本'
const encodeUri=encodeURI(myUri)
console.log(encodeUri)
console.log(decodeURI(encodeUri))

console.log('---------------------')
const encodeComponent=encodeURIComponent(myUri)
console.log(encodeComponent)
console.log(decodeURIComponent(encodeComponent))