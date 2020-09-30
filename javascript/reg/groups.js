/**
 * 组匹配
 * 圆括号
 * 
 */

const reg=/(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/u
const result=reg.exec('2015-12-02')

console.log(result.groups)