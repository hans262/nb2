import React, { useEffect } from 'react'
import { fromEvent, interval } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

/**
 * takeUntil<T>(
 *  notifier: Observable<any>
 * ): MonoTypeOperatorFunction<T>
 * 直到notifier Observable发出值，源值停止发射。
 */

export default function TakeUntil(){
  useEffect(()=>{
    console.clear()
    const clicks=fromEvent(document,'click')
    const source=interval(1000).pipe(
      takeUntil(clicks)
    )
    
    const subscription=source.subscribe(v=>console.log(v))
    return()=>{
      subscription.unsubscribe()
    }
  },[])
  return(
    <>
      <h1>TakeUntil</h1>
      <div>点击任意位置，停止发射源值</div>
    </>
  )
}