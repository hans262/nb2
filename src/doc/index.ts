/**
 * Event Loop 队列任务
 * 
 * 
 * 总是在当前"执行栈"的尾部触发
 * 不管它们是否嵌套），将全部在当前"执行栈"执行。
 */

// function hello() {
//   console.log('hello')
//   process.nextTick(hello)
// }

// setTimeout(function timeout() {
//   console.log('end')
// }, 0)

// hello()


/**
 * setImmediate
 * 它指定的任务总是在下一次Event Loop时执行
 */

setImmediate(function (){
  setImmediate(function A() {
      console.log(1);
      setImmediate(function B(){console.log(2);});
  });
  setTimeout(function timeout() {
    console.log('TIMEOUT FIRED');
  }, 0);
});