import { Injectable } from '@angular/core';
import { Observable, map, skip, scan, fromEvent, Subject, switchMap } from 'rxjs';
import { ClickData } from '../../shared/models/clickData';

@Injectable({
  providedIn: 'root'
})
export class ClicksService {
  private clickSurfaceElement = new Subject<HTMLDivElement>();
  clickSurfaceElement$ = this.clickSurfaceElement.asObservable();

  registerClickSurfaceElement(ref: HTMLDivElement){
    this.clickSurfaceElement.next(ref);
  }

  getClicks():Observable<ClickData[]> {//hot obs
    return this.clickSurfaceElement$.pipe(
      switchMap(el => fromEvent<PointerEvent>(el, 'click'))
    )
    .pipe(
      map(this.toClickData),
      skip(1),
      scan((acc:ClickData[], click) => [...acc, click], [])
    )
  }
  toClickData(event:PointerEvent, index:number):ClickData {
    return {x: event.clientX, y: event.clientY, index};
  }
}
