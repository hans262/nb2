/**
 * RegExp.test(str:string):boolean
 * 匹配是否包含
 * 
 */


const reg=/^(a|d)bc$/
console.log(reg.exec('abc'))

/**
 * 筛选img图片资源
 * 
 */
// function getImgSrc(str){
//   const arr=str.match(/<\s*img\s.*src.+\/\s*>/g)
//   if(!arr) return null
//   return arr.map(v=>{
//     const temp=/(?<=src=['|"])[^'"]+(?=['|"])/.exec(v)
//     if(temp){
//       return temp[0]
//     }
//   })
// }



/**
 * 筛选汉字
 * str.match(/[\u4E00-\u9FA5]+/g)
 */

/**
 * 电话号码
 * 以1开头，第二位固定，共11位
 * /^1[3|4|5|8]\d{9}$/
 */

/**
 * 金额
 * 小数点后两位，一位，0位
 * /^\d+(\.\d{1}|\.\d{2})*$/
 */

/**
 * 邮箱
 * /^\w+@\w+\.(com|cn)$/
 */



/*
const str=`<ul class="attr">
    <li>
        <a href='www.baidu.com' about='dwq'>百度baidu</ a>
        <a href='www.tecent.com' dwq="dwq">腾讯tengxun</ a>
        <a wd="dw" href="www.alibaba.com" dw><span>阿里巴巴alibaba</ a>
    </li>
  <a wd="dw" href="wang.com'>网易<b>dw</b><a href="wang.com'>哈哈</a></a >
</ul>`




function getHrefAndContent(str){
  const reg=/<a\s[^>]*href.+a\s*>/g
  const arr=str.match(reg)
  if(!arr) return null
  return arr.map(v=>{
    const temp=/href=['|"](?<href>[^'"]+)['|"][^>]*>(?<content>.+)<\s*\/\s*a>/u.exec(v)
    if(temp){
      return {key:temp[1],value:temp[2]}
    }
  })
}

const result=getHrefAndContent(str)

result.map(v=>console.log(v))

*/