import { encodeBase64, decodeBase64 } from '../app/common/base64'
import { bufferSplit } from '../src/common/utils'

describe('test -> Common', () => {
  test('base64', () => {
    expect(decodeBase64(encodeBase64('hello world'))).toBe('hello world')
    expect(decodeBase64(encodeBase64('name'))).toBe('name')
    expect(decodeBase64(encodeBase64('1231'))).toBe('1231')
    expect(decodeBase64(encodeBase64('12'))).toBe('12')

    // expect(m.T.equals(mt)).toBeTruthy()
    // expect(m.cominor(1, 2).equals(1)).toBeTruthy()


  })

  test('bufferSplit', () => {

    const b = Buffer.from('\r\n大青蛙私たち\r\n一天の一夜他\r\n我看iirftgr\r\n')

    const c = bufferSplit(b, '\r')

    c.forEach(ic => {
      console.log(ic.toString('utf-8'))
    })
    console.log(c)


    // let m = new Matrix([
    //   [1, 5, 0],
    //   [2, 4, -1],
    //   [0, -2, 0]
    // ])
    // expect(m.det()).toBe(-2)
  })
})