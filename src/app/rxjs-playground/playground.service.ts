import { Injectable } from '@angular/core';
import { Observable, concatMap, map, skip, scan, BehaviorSubject, fromEvent, EMPTY, interval, take, timer } from 'rxjs';
import { ClickData } from '../shared/models/clickData';
import { createArray } from '../shared/utils/utils';

@Injectable({
  providedIn: 'root'
})
export class PlaygroundService {
  private isClickEventActive:BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);//hot obs
  isClickEventActive$:Observable<boolean> = this.isClickEventActive.asObservable(); //hot obs
 
  getClicks():Observable<ClickData[]> {//hot obs
    return this.isClickEventActive$
    .pipe(concatMap(this.getPointerEvents))
    .pipe(
      map(this.toClickData),
      skip(1),
      scan((acc:ClickData[], click) => [...acc, click], [])
    )
  }
  toClickData(event:PointerEvent, index:number):ClickData {
    console.log(12321);
    return {x: event.clientX, y: event.clientY, index};
  }
  setClickEventActive():void{
    debugger;
    this.isClickEventActive.next(true);
  }
  getPointerEvents(isClickEventActive:boolean):Observable<PointerEvent>{//hot obs
    return isClickEventActive 
      ? fromEvent<PointerEvent>(document, 'click')
      : EMPTY;
  }

}
