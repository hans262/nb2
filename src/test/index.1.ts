interface StringArray<T> {
  setTime(d: Date): void
  [id:number]:string
}

let myArray: StringArray<string> = {
  25: 'huahua',
  setTime: function (d: Date): void {

  }
}

debugger