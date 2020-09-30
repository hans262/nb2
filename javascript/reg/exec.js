/**
 * RegExp.exec(str:String):Array|null
 * 匹配字符串
 * 
 */


// const reg=/\d+/g

let str=`<a href="www.bai2du.com?dw=dwq" about='dwq'>百度baidu < / a>`

// const key=/(?<=href=['|"])[^'"]+(?=['|"])/u.exec(str)
const key=/href=['|"](?<href>[^'"]+)['|"].*>(?<content>.+)<\s*\/\s*a>/u.exec(str)

const content=/(?<=>).+(?=<)/u.exec(str)

// console.log(key)






const url='?objectID=1.2.234.1231.1.213123123.20190428163603'
console.log(url.match(/objectID=([^&]*)&?/))

console.log(/objectID=(?<objectID>[^&]*)&?/.exec(url))

debugger



// console.log(/[^1]+/.exec('helloword123'))