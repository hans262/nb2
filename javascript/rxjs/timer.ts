/**
 * timer(
 *  dueTime: number | Date = 0, 
 *  periodOrScheduler?: number | SchedulerLike, 
 *  scheduler?: SchedulerLike
 * ): Observable<number>
 * 
 * 定时循环发射器
 * dueTime 起始时间
 * periodOrScheduler 时间间隔
 * 
 */

import { timer } from 'rxjs'
import { take } from 'rxjs/operators'
timer(1000, 1000).pipe(
  take(10)
).subscribe(x => console.log(x))