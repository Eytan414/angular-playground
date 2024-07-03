import { Injectable } from '@angular/core';
import { Observable, timer, take, concatMap, interval, EMPTY, mergeMap } from 'rxjs';
import { createArray } from '../../shared/utils/utils';

@Injectable({
  providedIn: 'root'
})
export class CounterService {

  newCounter(inputValue: number, type: string):Observable<number[]> {//cold obs, data generated within observable
    if(type === 'timer'){
      return timer(0, 1000).pipe(
        take(inputValue),
        mergeMap(createArray)
      )
    }
    if(type === 'interval'){    
      return interval(200).pipe(
        take(inputValue),
        mergeMap(createArray)
      )
    }
    return EMPTY;
  }
}
