namespace Test {
  /**
   * 训练数据
   * 模拟这样一个模型 -> y = 2x -1
   */
  type Input = number[]
  type Output = number[]
  const xs = [45, 60, 87, 120]
  const ys = [100, 140, 200, 270]

  /**
   * 初始化权重，置为0
   * 双参数模型 -> [θ0, θ1]
   */
  const weight = [0, 0]

  /**
   * 假设函数 H(X) = θ0 + θ1X
   * @param x 
   * @returns H(X)
   */
  function hypothetical(x: number) {
    return weight[0] + weight[1] * x
  }

  /**
   * 代价函数
   * J(θ0, θ1) = 1/2m * ∑m( H(X[i]) - Y[i] )^2
   * @param xs 
   * @param ys 
   * @returns 
   */
  function cost(xs: Input, ys: Output): number {
    const M = xs.length
    const sum = xs.reduce((p, c, i) => {
      return p + (hypothetical(c) - ys[i]) ** 2
    }, 0)
    return (1 / (2 * M)) * sum
  }

  /**
   * 学习率
   * 对于不同的数据类型需要调整训练率ß
   */
  const rate = 0.00001

  /**
   * 训练函数, 目的是更新两个权重值  
   * `θ(j) = θ(j) - rate * (d/ d* θ(j)) * J(θ0, θ1)`
   * 导数a其实是一个斜率，利用斜率的正负来控制增减
   * 这里用到了微积分求导知识  X0 = 1
   * `θ0 = θ0 - rate * 1/m ∑m(H(X[i]) - Y[i]) * X0[i]`  
   * `θ1 = θ1 - rate * 1/m ∑m(H(X[i]) - Y[i]) * X1[i]`
   * 多元参数的情况
   * `θ2 = θ2 - rate * 1/m ∑m(H(X[i]) - Y[i]) * X2[i]`
   */
  function tarin() {
    const loss = cost(xs, ys)
    console.log(loss)
    //改变权重
    let tempθ0, tempθ1;
    tempθ0 = tempθ1 = 0
    const M = xs.length
    tempθ0 = xs.reduce((p, c, i) => p + hypothetical(c) - ys[i], 0)
    tempθ1 = xs.reduce((p, c, i) => p + (hypothetical(c) - ys[i]) * c, 0)
    tempθ0 = weight[0] - rate * (1 / M) * tempθ0
    tempθ1 = weight[1] - rate * (1 / M) * tempθ1
    weight[0] = tempθ0
    weight[1] = tempθ1
  }

  for (let i = 0; i < 1000; i++) {
    tarin()
  }
  console.log(weight)
  console.log(hypothetical(200))
}