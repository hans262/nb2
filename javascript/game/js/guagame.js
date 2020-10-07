let GuaGame=function(){
	//获取canvas对象，并设置宽、高、边框
	let canvas=document.querySelector('.canvas')
	canvas.width=400
	canvas.height=300
	
	canvas.style.border='1px solid #ccc'
	//设置游戏属性
	let g={
		width:canvas.width,
		height:canvas.height,
		canvas:canvas,
		context:canvas.getContext('2d'),
		keydowns:{},
		actions:{a:12,b:23},
	}
	//封装画图功能
	g.drawImage=function(img){
		g.context.drawImage(img.image,img.x,img.y)
	}
	//封装擦画板功能
	g.clearContext=function(){
		g.context.clearRect(0,0,g.width,g.height)
	}
	//监听按下提起事件，并保存数组
	window.addEventListener('keydown',function(event){
		g.keydowns[event.key]=true
	})
	window.addEventListener('keyup',function(event){
		g.keydowns[event.key]=false
	})
	//封装按键事件，调用回调函数
	g.registerAction=function(key,callback){
		g.actions[key]=callback
	}
	let runloop=function(){
		let actions=Object.keys(g.actions)
		for(let i in actions){
			let key=actions[i]
			if(g.keydowns[key]){
				//根据按键，执行函数
				g.actions[key]()
			}
		}
		//执行更新动画
		g.updata()
		//擦除上一帧
		g.clearContext()
		//创建下一帧
		g.draw()
		//next runloop
		setTimeout(function(){
			runloop()
		},1000/allVar.fps)
	}
	setTimeout(function(){
		runloop()
	},1000/allVar.fps)
	return g
}