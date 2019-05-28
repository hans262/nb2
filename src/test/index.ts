function createArray<T>(length: number, value: T): Array<T> {
  let result: Array<T> = [];
  for (let i = 0; i < length; i++) {
    result[i] = value;
  }
  return result;
}

const result = createArray(5, 'x'); // ['x', 'x', 'x']
console.log(result)