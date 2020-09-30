//定义砖块
let Block=function(position){
	//position是[0,0]格式
	let p=position
	let image=imageFromPath('image/block.png')
	let o={
		image:image,
		x:p[0],
		y:p[1],
		w:71,
		h:19,
		alive:true,
		lifes:p[2]||1,//血量
	}
	o.kill=function(){
		o.lifes--
		if(o.lifes<1) o.alive=false
	}
	o.collide=function(b){
		return o.alive && rectIntersects(o,b)
	}
	return o
}