/*
	面向对象

	constructor
	每个对象都有一个constructor属性，储存着该对象函数引用，也就是对象类型

	prototype
	prototype链接着对象的成员方法，成员变量，公共方法

*/

/*
	extends实现

	function extend(subType,superType){
		//prototype里装着对象的成员方法/公共方法
		var prototype=new Object(superType.prototype)//拿到父类的prototype对象,创建一个副本
		//constructor储存着对象的构造方法
		prototype.constructor=superType//为副本添加constructor属性
		subType.prototype=prototype
	}

	function SuperType(name,age){
		this.name=name
		this.colors=['red','blue','greem',]
	}

	SuperType.prototype.sayName=function(){
		console.log(this.name)
	}

	function SubType(name,age){
		// SuperType.call(this,name)
		SuperType.apply(this, arguments)
		this.age=age
	}
	extend(SubType,SuperType)

	SubType.prototype.sayAge=function(){
		console.log(this.age)
	}

	//寄生组合式继承
	//可进行方法重写
	//构造函数，优先执行父类

	let ad=new SubType('Bills',25)
	ad.sayName()
	console.log(ad)
	console.log(SubType.prototype)

*/

/*
	时间委托、时间分流
	O('#app').addEventListener('click',function(e){
		switch(e.target.id){
			case 'btn1':
			console.log('btn1')
			break
			case 'btn2':
			console.log('btn2')
			break
			case 'btn3':
			console.log('btn3')
			break
		}
	})

*/
