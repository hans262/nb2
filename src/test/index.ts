import { readFileSync } from "fs";

interface Mid {
  (req: MyReq, res: MyRes, next: () => void): void
}

type MyReq = {
  name: string
}
type MyRes = {
  age: number
}

let req: MyReq = {
  name: 'huahua'
}
let res: MyRes = {
  age: 18
}

let con = (req: MyReq, res: MyRes) => {
  //做最初始化的装配
  return (...M: Mid[]) => {
    try {
      let i = 0
      const next = (): void => {
        const m: Mid = M[i++]
        if (!m) return
        m(req, res, next)
      }
      next()
    } catch (e) {
      console.log('500 服务器错误')
    }
  }
}

con(req, res)(
  (req, res, next) => {
    req.name = 'goudan'
    res.age = 20
    next()
  },
  (req, res, next) => {
    console.log(req)
    console.log(res)
    // readFileSync(__dirname + '/abc.js')
  }
)