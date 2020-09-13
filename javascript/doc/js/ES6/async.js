const p=function(x){
  return new Promise((resolve,reject)=>{
    setTimeout(()=>{
      if(x>0){
        resolve(x)
      }else{
        reject('不能为负')
      }
    },1000)
  })
}

;(async()=>{
  const r1=await p(10)
  console.log(r1)
  const r2=await p(20)
  console.log(r2)
})()
