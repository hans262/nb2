/**
 * proxy 对象代理
 * 在目标对象之前架设一层'拦截'，
 * 外界对该对象的访问，都必须先通过这层拦截
 */


namespace Test {
  type User = { name: string, age: number }
  type KeyUser = keyof User
  const user = new Proxy<User>({
    name: 'huahua', age: 12
  }, {
    get: (obj, key: KeyUser) => {
      return obj[key]
    },
    set: (obj, key: KeyUser, value: never) => {
      if (key === 'age' && value > 20) {
        throw new Error('年龄非法')
      }
      obj[key] = value
      return true
    }
  })
  user.age = 19
  console.log(user.name, user.age)
}