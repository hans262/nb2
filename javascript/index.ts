
namespace Test {
  /**
   * 0 0 -> 0
   * 1 0 -> 0
   * 0 1 -> 0
   * 1 1 -> 1
   */

  type Input = [number, number]
  type Output = number
  const inputs: Input[] = [[0, 0], [1, 0], [0, 1], [1, 1]]
  const outputs: Output[] = [0, 0, 0, 1]

  let weights = initWeights(3)
  function initWeights(num: number) {
    // 0 ~ 1
    return new Array<number>(num).fill(0).map(v => Math.random() - 0.5)
  }

  function sigmoid(x: number) {
    return 1 / (1 + Math.pow(Math.E, -x))
  }

  function calcOutput(inputs: Input[]): Output[] {
    return inputs.map(input => {
      let output = input[0] * weights[0] + input[1] * weights[1] + 1 * weights[2]
      return sigmoid(output)
    })
  }
  //求平均误差
  function calcLoss(cOutputs: Output[], outputs: Output[]) {
    const losss: number[] = []
    cOutputs.forEach((cop, i) => {
      let loss = Math.abs(cop - outputs[i])
      losss.push(loss)
    })
    return losss.reduce((tmp, item) => tmp + item) / losss.length
  }

  //计算最近n次的错误率的平均值
  const ls: number[] = []
  const maxError = 20
  function calcLossp(loss: number) {
    ls.push(loss)
    if (ls.length > maxError) {
      ls.shift()
    }
    return ls.reduce((tmp, item) => tmp + item) / ls.length
  }

  const trainRate = 0.001 //训练率
  const threshold = 0.001 //预值 当误差小于这个值的时候就可以
  function train(inputs: Input[], outputs: Output[]) {
    let cOutputs = calcOutput(inputs)
    //计算平均误差
    let loss = calcLoss(cOutputs, outputs)
    //满足平均误差 小于预值的时候 就不调整误差
    //计算下一次的误差，增加就减少权重，减少就增加权重
    weights.forEach((_, i) => {
      cOutputs = calcOutput(inputs)
      const nextLoss = calcLoss(cOutputs, outputs)
      if (nextLoss > loss) {
        weights[i] -= trainRate
      } else {
        weights[i] += trainRate
      }
    })
    loss = calcLoss(calcOutput(inputs), outputs)
    return loss
  }

  for (let i = 0; i < 100; i++) {
    const loss = train(inputs, outputs)
    console.log(i + ': ' + loss)
  }
}