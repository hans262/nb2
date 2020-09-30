/**
 * Array.prototype.join(separator?: string): string;
 * 以制定间隔符 连接数组 转化成字符串 并返回
 * 不修改原数组
 */

namespace Test {
  const arr = ['h', 'e', 'l', 'l', 'o']
  const hello = arr.join('')
  console.log(hello)
}
