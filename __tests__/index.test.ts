import { bufferSplit } from "../src/modules/bufferSplit"

test('bufferSplit', () => {
  const buf = Buffer.from('hello\r\nworld')
  const ret = [Buffer.from('hello'), Buffer.from('world')]
  expect(bufferSplit(buf, '\r\n')).toStrictEqual(ret)
})
