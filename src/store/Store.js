class Store{
	constructor(){
		this.generate()
	}
	generate(){
		if(global.Store) return
		global.Store={}
	}
}
