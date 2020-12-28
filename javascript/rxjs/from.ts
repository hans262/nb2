/**
 * from<T>(
 * input: ObservableInput<T>, scheduler?: SchedulerLike
 * ): Observable<T>
 * 
 * 从Array，类似数组的对象，Promise，可迭代对象
 * 创建发射源
 * 
 */

import { from } from 'rxjs'
import { take } from 'rxjs/operators'

namespace Test {
  //数组
  from([1, 2, 3]).subscribe(x => console.log(x))
  
  function* gen(i: number) {
    while (true) {
      yield i++
    }
  }
  //迭代对象
  from(gen(1)).pipe(
    take(5)
  ).subscribe(v => console.log(v))

}