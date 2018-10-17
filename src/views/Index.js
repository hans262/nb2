const map={
	'name': 'Bill',
	'age': 28,
}
module.exports=(req,res)=>{
	res.end(`
		<!DOCTYPE html>
		<html lang='en'>
		<head>
			<meta charset="utf-8">
			<title>index</title>
		</head>
		<body>
			<h1>hello world</h1>
			<p class="name">name: ${map.name}</p>
			<p class="age">age: ${map.age}</p>
		</body>
		</html>
	`)
}





