const store=[]

function add(x){
  store.push(x)
}

function get(){
  return store
}

module.exports={
  add,
  get
}