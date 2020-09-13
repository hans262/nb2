/**
 * 返回css当前属性
 * @param {string} ele 节点
 * @param {string} attr 属性
 */
export function getStyle(ele,attr){
  return ele.currentStyle ? ele.currentStyle[attr] : window.getComputedStyle(ele, null)[attr]
}