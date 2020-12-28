//定义创建Image对象功能
let imageFromPath = function (data) {
	let img = new Image()
	img.src = data
	return img
}
//定义判断相交函数
let rectIntersects = function (a, b) {
	if (a.x < b.x + b.image.width && a.x + a.image.width > b.x) {
		if (a.y < b.y + b.image.height && a.y + a.image.height > b.y) return true
	}
	return false
}