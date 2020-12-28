import React, { useEffect } from 'react'
import { of, fromEvent } from 'rxjs';
import { mergeMap, map } from 'rxjs/operators';
/**
 * mergeMap
 * 将每个源值投影到Observable，
 * 该Observable在输出Observable中合并。
 */

export default function MergeMap(){
  useEffect(()=>{
    console.clear()
    const hello=of('hello')
    const clicks=fromEvent(document,'click').pipe(
      map(e=>e.clientX),
      mergeMap(x=>hello.pipe(map(i=>x+'-'+i)))
    )
    const result=clicks.subscribe(v=>console.log(v))
    return()=>{
      result.unsubscribe()
    }
  },[])
  return(
    <>
      <h1>MergeMap</h1>
      <div>合并两个流</div>
    </>
  )
}