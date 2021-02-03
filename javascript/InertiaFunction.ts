/**
 * InertiaFunction 惰性函数
 * 利用了动态函数重写
 * 优化频繁执行判断
 * 
 */
namespace TestInertiaFunction {
  type CreateXHR = () => XMLHttpRequest | ActiveXObject
  let createXHR: CreateXHR = () => {
    if (XMLHttpRequest) {
      createXHR = () => {
        return new XMLHttpRequest()
      }
      return new XMLHttpRequest()
    } else {
      createXHR = () => {
        return new ActiveXObject("Microsoft.XMLHTTP")
      }
      return new ActiveXObject("Microsoft.XMLHTTP")
    }
  }
}
