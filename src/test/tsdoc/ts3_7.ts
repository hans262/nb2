namespace Ts3_7 {
  /**
   * Optional Chaining -> 可选链
   * Nullish Coalescing -> 空位合并
   * 
   */

  type Teacher = {
    subject?: string[]
    contact?: {
      location: string
      phone?: number[]
      email?: string
    }
  }

  const teacher: Teacher = {
    subject: ['Chemistry', 'History'],
    contact: {
      location: 'Washington'
    }
  }

  const email = teacher.contact?.email ?? 'hetong@hu123.ck'
  console.log(email)

  /**
   * 断言签名
   * 更加安全的never返回
   * 
   */
  function assertIsDefined<T>(val: T): asserts val is NonNullable<T> {
    if (val === undefined || val === null) {
      throw new Error(`Expected 'val' to be defined, but received ${val}`)
    }
  }
  assertIsDefined(123)

  function assertIsString(val: any): asserts val is string {
    if (typeof val !== "string") {
      throw new Error('Not of string')
    }
  }
  assertIsString('hello')

  function assert<T>(val: T, msg: string): asserts val {
    if (!val) throw new Error(msg)
    console.log('pass')
  }
  assert(null, 'val of undefined or null')

}
