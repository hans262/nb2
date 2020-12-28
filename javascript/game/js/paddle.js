//定义挡板对象
let Paddle = function () {
	let image = imageFromPath('image/paddle.png')
	let o = {
		image: image,
		x: 100,
		y: 200,
		speed: 10,
	}
	o.move = function (x) {
		if (x < 0) x = 0
		if (x > 400 - o.image.width) x = 400 - o.image.width
		o.x = x
	}
	o.moveLeft = function () {
		o.move(o.x - o.speed)
	}
	o.moveRight = function () {
		o.move(o.x + o.speed)
	}
	//定义相撞函数
	o.collide = function (b) {
		// if(o.y<b.y+b.image.height){
		// 	if(b.x>o.x && b.x<o.x+o.image.width){
		// 		return true
		// 	}
		// }
		return rectIntersects(o, b)
		// if(Math.abs(o.x-b.x)<o.image.width/2+b.image.width/2 && Math.abs(o.y-b.y)<o.image.height/2+b.image.height/2){
		// 	return true
		// }
	}
	return o
}