function p(name) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (name === 0) {
        reject('出错了')
      } else {
        resolve('hello ' + name)
      }
    }, 1000)
  })
}
function run(gen) {
  const g = gen()
  next()
  function next(data) {
    const result = g.next(data)
    const { done, value } = result
    if (done) return value
    value.then(
      data => next(data)
    ).catch(
      err => next(err)
    )
  }
}
run(function* () {
  console.log('start')
  const res1 = yield p(0)
  console.log(res1)
  const res2 = yield p('goudan')
  console.log(res2)
  console.log('done')
})