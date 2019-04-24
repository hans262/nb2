const { get }=require('./a')

function run(){
  console.log(get())
}
console.log(get())
module.exports=run