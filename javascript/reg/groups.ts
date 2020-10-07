/**
 * 分组查询
 * 圆括号代表一个组 尖括号定义变量名
 * 
 */
namespace Test {
  const reg = /(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/u
  const result = reg.exec('2015-12-02 2020-10-09')

  console.log(result)

}

