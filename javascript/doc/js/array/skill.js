/*
	按位运算符

	~ 按位取反
	0 --- -1
	1 --- -2
	-2 --- 1

	取整
	~~n
	n>>0
	n<<0
	n|0
*/

/*
	取10个不相同的随机数，10以内
	let set=new Set()
	while(set.size<10){
		set.add(~~(Math.random()*10))
	}
	console.log(set)
*/

/*
	整型数组去重，并排序
	let removeRepeat=(arr)=>{
		for(let i=arr.length-1;i>=0;i--){
			for(let j=i-1;j>=0;j--){
				if(arr[i]===arr[j]){
					arr.splice(j,1)
				}
			}
		}
		return arr.sort((a,b)=>{return a-b})
	}
*/

/*
	apply call 方法详解
	继承另外一个对象的属性

	let F=function(name,age){
		this.name=name
		this.age=age
	}
	let O=function(){
		F.apply(this,arguments)
	}
	O.prototype.sayName=function(){
		console.log(this.name)
	}
	let f=new F('Bill',25)
	let o=new O('dwawd',30)
	o.sayName()
	console.log(o)

	call写法
	F.call(this,name,age)


	私有属性实现
	let FF=function(name,age){
		this._name=name
		this._age=age
	}
	FF.prototype.eat=function(){
		console.log(this.name+'is eating')
	}
	FF.prototype.setName=function(name){
		this._name=name
	}
	FF.prototype.setAge=function(age){
		this._age=age
	}
	FF.prototype.getName=function(){
		return this._name
	}
	FF.prototype.getAge=function(){
		return this._age
	}

	let ff=new FF('bill',25)
	ff.setName('tom')
	console.log(ff.getName())

*/


/*
	扩展运算符
	扩展运算符用三个点号表示，功能是把数组或类数组对象展开成一系列用逗号隔开的值

	let fn=(a,b,c)=>{
		console.info(a)
		console.info(b)
		console.info(c)
	}
	let arr=[1,2,3,4]
	fn(...arr)
	console.info(...arr)

	数组深拷贝，浅拷贝是指针相同，指向内存同一位置
	let arr1=[1,2,3,4]
	let arr2=arr1
	let arr3=[...arr1]
	arr1.push(5)

	console.info(arr1===arr2)
	console.info(arr1===arr3)

	rest运算符
	rest运算符也是三个点号，不过其功能与扩展运算符恰好相反，把逗号隔开的值序列组合成一个数组

	let ff=(...args)=>{
		console.info(args)
	}
	ff(1,2,3,4)

	let [a, ...rest] = [1, 2, 3, 4]
	console.log(a)
	console.log(rest)

*/