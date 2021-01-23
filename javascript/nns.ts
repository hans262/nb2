
namespace Test {
  const datas: any[] = [
    [[0, 0], 0],
    [[1, 0], 0],
    [[0, 1], 0],
    [[1, 1], 1]
  ]
  const weights: number[] = []
  for (let i = 0; i < 3; i++) {
    weights[i] = Math.random() - 0.5
  }

  //计算输出
  function calcOutput(inputs: number[]) {
    let output = inputs[0] * weights[0] + inputs[1] * weights[1] + 1 * weights[2]
    return sigmoid(output)
  }

  //计算误差
  function errRate(output: number, excepted: number) {
    return Math.abs(output - excepted)
  }

  //计算最近n次的错误率的平均值
  const errors: number[] = []
  const maxError = 20
  function calcError(err: number) {
    errors.push(err)
    if (errors.length > maxError) {
      errors.shift()
    }
    return errors.reduce((tmp, item) => tmp + item) / errors.length
  }

  //训练
  const d = 0.00001 //增量
  const trainRate = 0.1 //训练率
  const threshold = 0.001 //预值
  let times = 1
  function train(inputs: number[], excepted: number) {
    let err = errRate(calcOutput(inputs), excepted)

    const dw: number[] = []
    weights.forEach((w, i) => {
      weights[i] += d
      let err2 = errRate(calcOutput(inputs), excepted)
      dw[i] = (err2 - err) / d
      weights[i] = w
    })

    weights.forEach((w, i) => {
      weights[i] -= dw[i] * trainRate
    })

    let e = calcError(err)
    console.log(e)

    times++
    if (times % 5000 == 0) {
      console.log(times, e)
    }
    return e <= threshold
  }

  function sigmoid(x: number) {
    return 1 / (1 + Math.pow(Math.E, -x))
  }

  train(datas[0][0], datas[0][1])

  for (let i = 0; ; i++) {
    let data = datas[i % datas.length]
    if (train(data[0], data[1])) {
      break
    }
  }

  console.log(weights)
  //验算
  for(let i = 0; i< datas.length; i++){
    console.log(Math.round(calcOutput(datas[i][0])))
  }

}