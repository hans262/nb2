/**
 * of<T>(...args: Array<T | SchedulerLike>): Observable<T>
 * 将参数转化为发射源
 * 
 */

import { of } from 'rxjs'

namespace Test {
  of(1, 2, 'huahua').subscribe(x => console.log(x))
  of([4, 5, 6]).subscribe(x => console.log(x))

}