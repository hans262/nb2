/**
 * RegExp.exec(string: string): RegExpExecArray | null;
 * 方法在一个指定字符串中执行一个搜索匹配。返回一个结果数组或 null。
 * 
 */
namespace Test {
  console.log(/(hello \S+)/.exec('This is a hello world!'))

}
