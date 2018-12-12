let arr=[{
	bool:function(req,res){return false},
	fn:()=>console.log(1)
},{
	bool:function(req,res){return true},
	fn:()=>console.log(2)
},{
	bool:function(req,res){return false},
	fn:()=>console.log(3)
},{
	bool:function(req,res){return false},
	fn:()=>console.log(4)
}]


for(v of arr){
	if(v.bool()){
		v.fn()
		return
	}
}
