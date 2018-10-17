/*
	async await
	能保证多个异步函数，按照顺序执行,
	此函数接收Promise对象，处理异常使用catch
	
	异步继发->
	var P=function(x){
		return new Promise((resolve,reject)=>{
			setTimeout(()=>{
				x++
				if(x<10){
					resolve(x)
				}else{
					reject(10)
				}
			},500)
		})
	};
	(async function(){
		const p1=await P(0) 直接拿到resolve结果
		console.log(p1)
		const p2=await P(p1)
		console.log(p2)
	})()

	异步并发->
	(async function(){
		let docs=[{},{},{}]
		// let promises=docs.map((doc) => P(1))
		let promises=[P(0),P(1),P(2)]

		let results=await Promise.all(promises)
		console.log(results)
	})()

	处理错误->
	const p1=await P(9).catch(err=>console.log(err))
	//try..catch处理方式，不影响后面异步
	(async function(){
		try{
			let p1=await P(9)
		}catch(e){
			console.log(e)
		}
		let p2=await P(2)
		console.log(p2)
	})()

*/

/*
	Promise
	处理异步函数，处理异常
	
	var p=function(){
		return new Promise((resolve,reject)=>{
			resolve(异步结果)
			reject(异步异常)
		})
	}

	p().then(result=>{
		console.log(result)结果
	}).catch(err=>console.log(err))异常

*/

/*
	Iterator
	数组迭代器实现

	var iterator=function(array){
	  var nextIndex = 0;
	  return {
	    next: function() {
	      return nextIndex < array.length ?
	        {value: array[nextIndex++]} :
	        {done: true}
	    }
	  }
	}

	var arr=[1,2,3]
	let it=iterator(arr)

	console.log(it.next().value)
	console.log(it.next().value)
	console.log(it.next().value)
	console.log(it.next().value)

*/