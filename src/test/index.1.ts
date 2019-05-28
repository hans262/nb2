interface StringArray<T> {
  setTime(d: Date): void
  [id:number]:string
}

let myArray: StringArray<string> = newFunction()

function newFunction(): StringArray<string> {
  return {
    25: 'huahua',
    setTime: function (d: Date): void {
    }
  };
}