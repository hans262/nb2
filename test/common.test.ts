import { bufferSplit, encodeBase64, decodeBase64 } from '../src/common/utils'
import { createHmacSecret, deCipheriv, toCipheriv } from '../src/common/encrypt'

describe('test -> common', () => {
  test('base64', () => {
    expect(decodeBase64(encodeBase64('hello world'))).toBe('hello world')
    expect(decodeBase64(encodeBase64('name'))).toBe('name')
    expect(decodeBase64(encodeBase64('1231'))).toBe('1231')
    expect(decodeBase64(encodeBase64('12'))).toBe('12')
  })

  test('bufferSplit', () => {
    const buf = Buffer.from('\r\n大青蛙私たち\r\n一天の一夜他\r\n我看iirftgr\r\n')
    const bufs = bufferSplit(buf, '\r\n')
    expect(bufs.length).toBe(3)
    expect(bufs[0].toString()).toBe('大青蛙私たち')
    expect(bufs[1].toString()).toBe('一天の一夜他')
    expect(bufs[2].toString()).toBe('我看iirftgr')
  })

  test('createHmacSecret', () => {
    const a = createHmacSecret('hello', 'hans', 'sha1')
    const b = createHmacSecret('hello', 'hans', 'sha1')
    const c = createHmacSecret('hello', 'Hans', 'md5')
    expect(a).toBe(b)
    expect(a === c).toBeFalsy()
  })

  test('toCipheriv', () => {
    const key = Buffer.from('9vApxLk5G3PAsJrM', 'utf8')
    const iv = Buffer.from('FnJL7EDzjqWjcaY9', 'utf8')

    const ret = toCipheriv('hello', key, iv)
    expect(deCipheriv(ret, key, iv)).toBe('hello')
    //dd5c27de141494924da6e6db3276de20
  })
})
