namespace Test {
  type Input = [number, number]
  type Output = number

  const sample: [Input, Output][] = [
    [[0, 0], 0],
    [[1, 0], 0],
    [[0, 1], 0],
    [[1, 1], 1]
  ]
  function initWeights(num: number) {
    return new Array(num).fill(0).map(_ => Math.random() - 0.5)
  }
  //初始化权重
  const weights: number[] = initWeights(3)

  function sigmoid(x: number) {
    return 1 / (1 + Math.pow(Math.E, -x))
  }
  //计算输出
  function calcOutput(inputs: number[]) {
    let output = inputs[0] * weights[0] + inputs[1] * weights[1] + 1 * weights[2]
    return sigmoid(output)
  }

  //计算误差
  function calcLoss(output: number, excepted: number) {
    return Math.abs(output - excepted)
  }

  //计算20次误差平均值
  const losss: number[] = []
  const max = 20
  function calcAverageloss(err: number) {
    losss.push(err)
    if (losss.length > max) {
      losss.shift()
    }
    return losss.reduce((a, b) => a + b) / losss.length
  }

  const d = 0.001 //增量
  const trainRate = 0.001 //训练率
  const threshold = 0.01 //预值
  let count = 0
  function train(inputs: number[], excepted: number) {
    let loss = calcLoss(calcOutput(inputs), excepted)
    weights.forEach((w, i) => {
      weights[i] += d
      let loss2 = calcLoss(calcOutput(inputs), excepted)
      const dw = (loss2 - loss) / d
      weights[i] = w - dw * trainRate
    })
    let evt = calcAverageloss(loss)
    count++
    if (count % 5000 === 0) {
      console.log(count, evt)
    }
    return evt <= threshold
  }

  for (let i = 0; ; i++) {
    let data = sample[i % sample.length]
    if (train(data[0], data[1])) {
      break
    }
  }

  //验算
  console.log(weights)
  sample.forEach(data => {
    console.log(calcOutput(data[0]))
  })




  class Model {
    d = 0.001 //增量
    trainRate = 0.001 //训练率
    threshold = 0.01 //预值
    epochs = 0
    train() {

    }
    fit(xs: Input[], ys: Output[] ) {

    }

  }







}