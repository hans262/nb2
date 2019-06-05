class X {
  name: string
  age?: number
  add(): boolean {
    return true
  }
}
interface M extends X {
  gender: string
}

class O implements M {
  gender: string;
  name: string; age?: number;
  add(): boolean {
    throw new Error("Method not implemented.");
  }
}