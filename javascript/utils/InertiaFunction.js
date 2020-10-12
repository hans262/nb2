/**
 * InertiaFunction
 * 惰性函数
 * 作用：优化频繁执行同一个判断函数，多用在判断系统类
 * 利用了函数的重写
 * 
 */

function createXHR(){
  //每次请求都需要去判断
  if(XMLHttpRequest){
    return new XMLHttpRequest()
  }else{
    return new ActiveXObject("Microsoft.XMLHTTP")
  }
}


function createXHR(){
  //惰性写法
  if(XMLHttpRequest){
    createXHR=function(){
      return new XMLHttpRequest()
    }
    return new XMLHttpRequest()
  }else{
    createXHR=function(){
      return new ActiveXObject("Microsoft.XMLHTTP")
    }
    return new ActiveXObject("Microsoft.XMLHTTP")
  }
}