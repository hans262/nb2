
function getCookie(req, key){
  console.log(req.headers.cookie)
  const { cookie }=req.headers
  if(!cookie) return null
  const reg = new RegExp("(^| )" + key + "=([^;]*)(;|$)")
  const arr=cookie.match(reg)
  return arr ? unescape(arr[2]) : null
}

module.exports=getCookie