//定义弹射球
let Ball=function(){
	let image=imageFromPath('image/ball.png')
	let o={
		image:image,
		x:100,
		y:250,
		speedX:10,
		speedY:10,
		fired:false,//发射开关
	}
	o.move=function(){
		if(o.fired){
			if(o.x<0||o.x+o.image.width>400) o.speedX*=-1
			if(o.y<0||o.y+o.image.height>300) o.speedY*=-1
			o.x+=o.speedX
			o.y+=o.speedY
		}
	}
	o.fire=function(){
		o.fired=true
	}
	o.stop=function(){
		o.fired=false
	}
	o.rebound=function(){
		o.speedY*=-1
	}
	return o
}