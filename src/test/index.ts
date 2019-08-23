const test = Buffer.alloc(20)
test[0] = 126
test.writeBigUInt64BE(18446744073709551615n, 1)
console.log(test)
debugger