/**
 * declare ->
 * 全局申明关键词
 * 一般用在.d.ts文件中
 */
namespace Testdeclare {
  declare class Component<P> {
    props: P
    constructor(props: P)
  }

  //其他文件 即可使用这个类型
  class Bok implements Component<{
    name: string
  }> {
    props = {
      name: 'huahua'
    }
  }
}
