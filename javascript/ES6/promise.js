/**
 * Promise 携带结果和异常的对象
 * try 捕捉异常
 * catch 处理异常
 * finally 一定执行
 */

function P(x){
  return new Promise((resolve,reject)=>{
    setTimeout(()=>{
      if(x>=0){
        resolve(x)
      }else{
        reject('参数异常，不能为负！')
      }
    },1000)
  })
}

/**
 * 继发
 */
/*
;(async ()=>{
  try{
    const p1=await P(5)
    console.log(p1)
    const p2=await P(-2)
    console.log(p2)
  }catch(err){
    console.log(err)
  }
  console.log(123)
})()
*/

/**
 * 并发
 */
/*
;(async function(){
  try{
    let results=await Promise.all([P(0),P(1),P(2)])
    console.log(results)
  }catch(err){
    console.log(err)
  }finally{
    console.log(123)
  }
})()
*/