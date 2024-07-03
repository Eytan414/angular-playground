import { Injectable, signal } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs/internal/Observable';
import { of } from 'rxjs/internal/observable/of';
import { map } from 'rxjs/internal/operators/map';

@Injectable({
  providedIn: 'root'
})
export class ArrayService {
  
  getColors(arrayColorInput:FormControl):Observable<string>{//hot obs
    return arrayColorInput.valueChanges.pipe(
      map(color => color || '#000')
    )
  }
  getRandomNumbers():Observable<number[]> {//cold obs, data generated within observable
    const arr:number[] = new Array(123).fill(Math.floor(1+Math.random()*420));//1-420
    return of(arr);
  }

}
