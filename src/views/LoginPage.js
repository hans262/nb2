module.exports=(req,res)=>{
	res.setHeader('Content-Type','text/html; charset=utf-8')
	res.writeHead(200,'OK')
	res.end(`
		<h1>SIGN IN</h1>
		<button id="btn">登陆</button>
		<script type="text/javascript">
			document.getElementById('btn').addEventListener('click',function(){
				ajax({
					type:'post',
					url:'/loginReq',
					data:{username:'huahua',password:123456},
					success:data=>{
						let o=JSON.parse(data)
						if(o.success){
							window.location.href='/'
						}
					}
				})
			})
			function ajax(o){
				o.type=(o.type)?o.type:'get'
				o.data=(o.data)?o.data:null
				o.async=(o.async)?false:true
				o.success=(o.success)?o.success:function(){}
				o.failed=(o.failed)?o.failed:function(){}
				let xhr=(window.XMLHttpRequest) ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP")

				if(o.data && (typeof o.data === 'object')){
					let arr=[]
					for(let key in o.data) arr.push(key+'='+o.data[key])
					o.data=arr.join('&')
				}
				if(o.data && o.type==='get'){
					o.url+='?'
					o.url+=o.data
					o.data=null
				}
				xhr.open(o.type,o.url,o.async)
				if(o.data && o.type==='post'){
					xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded")
				}
				xhr.send(o.data)
				xhr.onreadystatechange=function(){
					if(xhr.readyState===4){
						if(xhr.status===200){
							o.success(xhr.responseText)
						}else{
							o.failed({status:this.status,statusText:this.statusText})
						}
					}
				}
			}
		</script>
	`)
}