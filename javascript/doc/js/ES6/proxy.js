/**
 * proxy 对象代理
 * 在目标对象之前架设一层'拦截'，
 * 外界对该对象的访问，都必须先通过这层拦截
 */

const user=new Proxy({
  fName:'Bob',//这里代表私有属性
  lName:'Wood'
},{
  get:function(obj,key){
    switch(key){
      case 'fullName':
        return obj.fName+' '+obj.lName
      default:
        return obj[key]
    }
  },
  set:function(obj,key,value){
    if(value>1){
      obj[key]=value
    }else{
      throw new Error('年龄不合法')
    }
  }
})
user.age=10
console.log(user.age)