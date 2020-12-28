


namespace Test {
  const p = (x: number) => new Promise<number>((resolve, reject) => {
    setTimeout(() => {
      x < 1 ? reject('参数异常') : resolve(x)
    }, 1000)
  })

  function run(gen: () => Generator<Promise<number>, string>) {
    const g = gen()
    function next(data?: number | undefined): any {
      const iterator = g.next(data)
      const { done, value } = iterator
      if (done) return value
      if (value instanceof Promise) {
        value.then(data => next(data)).catch(err => next(err))
      }
    }
    next()
  }

  run(function* (): Generator<Promise<number>, string> {
    const res1 = yield p(1)
    console.log(res1)
    const res2 = yield p(2)
    console.log(res2)
    return 'done'

  })
}