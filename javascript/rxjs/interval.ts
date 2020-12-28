/**
 * interval(
 *  period: 0 = 0, 
 *  scheduler: SchedulerLike = async
 * ): Observable<number>
 * 
 * 循环间隔发射器
 */

import { interval } from 'rxjs'
interval(1000).subscribe(x => console.log(x))