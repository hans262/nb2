/**
 * 获取cookie对应值
 * @param {string} key
 * @returns {value|null}
 */
export function getCookie(key){
  const reg = new RegExp("(^| )" + key + "=([^;]*)(;|$)")
  const arr=document.cookie.match(reg)
  return arr ? unescape(arr[2]) : null
}
/**
 * 设置cookie
 * @param {key:string; value:string; day:number} o 
 */
export function setCookie(o){
  const { key, value, day=30, path='/' }=o
  const times=Date.now() + day*24*60*60*1000
  let expires='expires='+new Date(times).toGMTString()
  document.cookie=key + '=' + value+ '; ' + expires + '; path=' + path
}
/**
 * 删除cookie 注意path路径
 * @param {string} key 
 * @param {string} path 
 */
export function removeCookie(key,path){
	document.cookie=key+'= ; path='+path+'; expires='+new Date().toGMTString()
}