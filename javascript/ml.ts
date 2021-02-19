namespace Test {
  //y = xw
  type Input = number[]
  type Output = number[]
  const xs = [1, 2, 3, 4]
  const ys = [2, 4, 6, 8]

  //初始化权重
  let weight: number = Math.random() + 1

  //计算输出
  function calcOutput(input: number) {
    return input * weight
  }

  const d = 0.0001 //增量
  const threshold = 0.001 //预值
  function tarin(xs: Input, ys: Output) {
    const real = xs.map(input => calcOutput(input))
    const losss = real.map((rv, i) => rv - ys[i])
    //求平均误差
    const loss = losss.reduce((a, b) => a + b) / losss.length
    //误差为负数 说明权重小了，误差为正说明权重大了
    if (loss > 0) {
      weight -= d
    } else {
      weight += d
    }
    return Math.abs(loss)
  }

  for (let i = 0; ; i++) {
    let loss = tarin(xs, ys)
    console.log(i + ': ' + loss)
    if (loss < threshold) {
      console.log(calcOutput(5))
      break
    }
  }
}