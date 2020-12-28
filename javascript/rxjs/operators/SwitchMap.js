import React, { useState ,useEffect } from 'react'
import { fromEvent, interval } from 'rxjs'
import { switchMap } from 'rxjs/operators'
/**
 * switchMap<T, R, O extends ObservableInput<any>>(
 *  project: (value: T, index: number) => O, 
 *  resultSelector?: (outerValue: T, innerValue: ObservedValueOf<O>, outerIndex: number, innerIndex: number) => R
 * ): OperatorFunction<T, ObservedValueOf<O> | R>
 * 
 * 将每个源值投影到一个Observable，
 * 该Observable在输出Observable中合并，
 * 仅从最近投影的Observable中发出值。
 */

export default function SwitchMap(){
  const [count,setCount]=useState(0)
  useEffect(()=>{
    const observable=fromEvent(document, 'click').pipe(
      switchMap(e=>interval(500))
    )
    const subscription=observable.subscribe(x=>setCount(x))
    return()=>{
      subscription.unsubscribe()
    }
  },[])
  return(
    <>
      <h1>SwitchMap</h1>
      <div>每次点击，都会重新运行一个发射源</div>
      <h2>{count}</h2>
    </>
  )
}