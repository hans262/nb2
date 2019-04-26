class A{
  constructor(){
    this.store=[]
  }
  add(v){
    this.store.push(v)
  }
  get(){
    return this.store
  }
}

module.exports=new A()