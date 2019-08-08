/**
 * declare ->
 * 全局申明关键词
 */
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