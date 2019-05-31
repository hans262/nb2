//断言
function getLength(something: string | number): number {
  if ((<string>something).length) {
    return (<string>something).length;
  } else {
    return something.toString().length;
  }
}
const results = getLength('dwqdqw')
console.log(results)
debugger