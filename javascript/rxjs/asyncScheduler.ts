import { asyncScheduler, Observable } from 'rxjs'
import { observeOn } from 'rxjs/operators'

const observable = new Observable(obs => {
  obs.next(1)
  obs.next(2)
  obs.next(3)
  obs.complete()
}).pipe(
  observeOn(asyncScheduler)
)
console.log('before')
observable.subscribe({
  next(v) {
    console.log(v)
  },
  complete() {
    console.log('done')
  }
})
console.log('after')