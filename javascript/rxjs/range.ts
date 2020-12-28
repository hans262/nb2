/**
 * range(
 * start: number = 0, count?: number, scheduler?: SchedulerLike
 * ): Observable<number>
 * 创建一个范围发射源
 * 
 */

import { range } from 'rxjs'

range(2, 5).subscribe(x => console.log(x))
