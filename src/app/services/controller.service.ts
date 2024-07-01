import { Injectable, inject } from '@angular/core';
import {concatMap, map, scan, skip, switchMap, take, tap } from 'rxjs/operators';
import {BehaviorSubject, EMPTY, Observable, Subject, fromEvent, interval, of, timer } from 'rxjs';
import { Quote, QuotesResponse } from '../shared/models/quotes'; // Assuming Task is exported in tasks.ts
import { Todo } from '../shared/models/todo'; // Assuming Task is exported in tasks.ts
import { todoSort } from '../shared/utils/utils'; // Assuming Task is exported in tasks.ts
import { FormControl } from '@angular/forms';
import { PageParams } from '../shared/models/pageParams';
import { PageEvent } from '@angular/material/paginator';
import { BackendService } from './backend.service';
import { DEFAULT_PAGE_PARAMS } from '../shared/models/data';
import { ClickData } from '../shared/models/clickData';

@Injectable({
  providedIn: 'root'
  })
  export class ControllerService {
    private backendService = inject(BackendService);
    private baseUrl = 'http://127.0.0.1:4200/'; 

    private isClickEventActive:BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);//hot obs
    isClickEventActive$:Observable<boolean> = this.isClickEventActive.asObservable(); //hot obs
    private pageParams = new BehaviorSubject<PageParams>({ pageSize: 20, skip: 0 });
    private radio = new BehaviorSubject<string>('quotes');
    private allQuotesCount = new Subject<number>();
    radio$:Observable<string> = this.radio.asObservable();
    private chosenAuthor!:string;
    
    
    get allQuotesCount$(): Observable<number>{
       return this.allQuotesCount.asObservable();
    }
    get quotes$(): Observable<Quote[]>{
      return this.radio$.pipe(
        switchMap((radioval:string) => 
          radioval === 'quotes' 
            ? this.pageParams$.pipe(switchMap(this.quotesHandler))
            : EMPTY
        )
      )
    }
    get todos$(): Observable<Todo[]>{
      const url = 'https://jsonplaceholder.typicode.com/todos';
      return this.radio$.pipe(
        switchMap(radio => 
          radio === 'todos' 
            ? this.backendService.get<Todo[]>(url)
                .pipe(map(todos => todos.sort(todoSort)))
            : EMPTY
        )
      )   
    }
    
    get pageParams$():Observable<PageParams>{//hot obs
      return this.pageParams.asObservable();
    }
    
    pageChanged(paginatorParams: PageEvent) {
      const newValues:PageParams = {
        pageSize: paginatorParams.pageSize,
        skip: paginatorParams.pageIndex * paginatorParams.pageSize,
        previousPageIndex: paginatorParams.previousPageIndex
      }
      this.updatePageParams(newValues);
    }
    

    private quotesHandler = ({pageSize = 20, skip = 0}:PageParams):Observable<Quote[]> => {
        const url = `https://dummyjson.com/quotes?limit=${pageSize}&skip=${skip}`;
      
        return pageSize === 0 ?//pagesize=0 gets all quotes 
          this.backendService.get<QuotesResponse>(url).pipe(
            map((q:QuotesResponse) => q.quotes),
            map((quotes:Quote[]) => 
              quotes.filter((q:Quote) =>
                  q.author.trim() === this.chosenAuthor.trim()))
          )
          :
          this.backendService.get<QuotesResponse>(url).pipe(
            tap( (q:QuotesResponse) =>{console.log(q.total); this.allQuotesCount.next(q.total)} ),
            map( (q:QuotesResponse) => q.quotes )
          )
      }
  
    getDefaultQuotes(){      
      this.updatePageParams(DEFAULT_PAGE_PARAMS);
    } 
    getQuotesFromAuthor(author: string) {
      this.chosenAuthor = author;
      this.updatePageParams({pageSize: 0, skip:0});
    }

      updatePageParams(newParams:PageParams):void{
      this.pageParams.next(newParams);      
    }
    
    radioChanged(newValue:string){
      this.radio.next(newValue);
    }

    getColors(arrayColorInput:FormControl):Observable<string>{//hot obs
        return arrayColorInput.valueChanges.pipe(
          tap(color => document.getElementsByTagName('body')[0].style.setProperty('--arrayColor', color)),
          map(color => color || '#000')
      )
    }
    
    getClicks():Observable<ClickData[]> {//hot obs
      return this.isClickEventActive$
      .pipe(concatMap(this.getPointerEvents))
      .pipe(
        map(this.toClickData),
        skip(1),
        scan((acc:ClickData[], click) => [...acc, click], [])
      )
    }
      
    getPointerEvents(_:boolean):Observable<PointerEvent>{//hot obs
      const pointerEvent:Observable<PointerEvent> = fromEvent<PointerEvent>(document, 'click');
      return pointerEvent;
    }
    toClickData(event:PointerEvent, index:number):ClickData {
      return {x: event.clientX, y: event.clientY, index};
    }

    getRandomNumbers():Observable<number[]> {//cold obs, data generated within observable
      const arr:number[] = new Array(123).fill(Math.floor(1+Math.random()*420));//1-420
      return of(arr);
    }
    
    setClickEventActive():void{
      this.isClickEventActive.next(true);
    }
    
    newTimer(inputValue: any): Observable<number[]> {//cold obs, data generated within observable
      return timer(0, 1000).pipe(
        take(inputValue),
        concatMap(index => {
          const numbers = Array.from({ length: index + 1 }, (_, i) => i + 1);
          return [numbers];
        })
      )
    }
    newInterval(inputValue: number):Observable<number[]> {//cold obs, data generated within observable
      return interval(250).pipe(
        take(inputValue),
        concatMap(index => {
          const numbers = Array.from({ length: index + 1 }, (_, i) => i + 1);
          return [numbers];
        })
      )
    }

    getProducts(): Observable<unknown[]>{
      const url = `${this.baseUrl}getProducts`;
      return this.backendService.get<unknown[]>(url);
    }
    
    sendDataArr(arr:number[]) {
      const url = this.baseUrl + 'data';
      return this.backendService
      .post<number[]>(
          url,
          JSON.stringify(arr),
          'application/json'
        );
    }

    submit(formData: any) {
      const url = this.baseUrl + 'contactus'; 

      return this.backendService.post(
          url,
          JSON.stringify(formData),
          'application/json'
        );
    }


}
