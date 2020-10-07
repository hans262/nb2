/**
 * 选择器
 * @param {string} el 
 */
export function select(el){
  const start=el.charAt(0)
  switch(start){
    case '.':
      return el.includes(' ') ? document.querySelectorAll(el) : document.querySelector(el)
    case '#':
      return el.includes(' ') ? document.querySelectorAll(el) : document.getElementById(el.split('#')[1])
    default:
      return document.getElementsByTagName(el)
  }
}
/**
 * 相同类名的用这个
 * @param {string} el 
 */
export function selectAll(el){
	return document.querySelectorAll(el)
}
