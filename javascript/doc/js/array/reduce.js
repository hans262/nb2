/**
 * reduce(function(pre, cur, curIndex, arr), initialValue)
 * 接收一个函数作为累加器
 * 
 * pre 上次的值
 * cur 当前值
 * curIndex 当前值索引
 * arr 当前数组
 * initialValue 初始值
 * 
 */

//求和
const arr=[1,2,3]
const sum=arr.reduce((pre,cur,curIndex,arr)=>{
	console.log(pre)
	console.log(cur)
	console.log('---------')
	return pre+cur
},5)
console.log(sum)

//计重器
// const arr=['apple','orange','apple','orange','pear','orange']
// const obj=arr.reduce((total,v)=>{
// 	if(total[v]){
// 		total[v]=total[v] + 1
// 	}else{
// 		total[v]=1
// 	}
// 	return total
// },{})
// console.log(obj)