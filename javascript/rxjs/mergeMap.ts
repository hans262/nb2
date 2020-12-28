/**
 * mergeMap<T, R, O extends ObservableInput<any>>(
 *  project: (value: T, index: number) => O, 
 *  resultSelector?: ((outerValue: T, innerValue: ObservedValueOf<O>, 
 *  outerIndex: number, innerIndex: number) => R) | number, 
 *  concurrent: number = Number.POSITIVE_INFINITY
 * ): OperatorFunction<T, ObservedValueOf<O> | R>
 * 
 * 合并发射源
 */
import { of } from 'rxjs'
import { map, mergeMap } from 'rxjs/operators'

const a = of('Bill', 'Bob', 'Tom')
const b = of('Hello')
const observable = a.pipe(
  mergeMap(v => b.pipe(map(i => i + ' ' + v)))
)

observable.subscribe(v => console.log(v))