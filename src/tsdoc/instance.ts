//实例的键
const singleton: unique symbol = Symbol('instance')

class Hor {
  private static [singleton]: Hor
  public static get instance(): Hor {
    if (!this[singleton]) {
      this[singleton] = new Hor()
    }
    return this[singleton]
  }
  private constructor() { }
  byk() { }
  protected loc: string = 'sic'
}

console.log(Hor.instance)
debugger