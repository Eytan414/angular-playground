import { Injectable, inject } from '@angular/core';
import { PageParams } from '../../shared/models/pageParams';
import { PageEvent } from '@angular/material/paginator';
import { DEFAULT_PAGE_PARAMS } from '../../shared/models/data';
import { Quote, QuotesResponse } from '../../shared/models/quotes';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/internal/operators/map';
import { switchMap  } from 'rxjs/internal/operators/switchMap';
import { tap } from 'rxjs/internal/operators/tap';
import { QuotesBackendService } from './quotes-backend.service';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Subject } from 'rxjs/internal/Subject';

@Injectable({
  providedIn: 'root'
})
export class QuotesService {
  private backend = inject(QuotesBackendService);
  
  private pageParams = new BehaviorSubject<PageParams>({ pageSize: 20, skip: 0 });
  private allQuotesCount = new Subject<number>();
  private chosenAuthor!:string;
    
  
  get quotes$(): Observable<Quote[]>{
    return this.pageParams$.pipe(switchMap(this.quotesHandler));
  }

  private quotesHandler = ({pageSize, skip}:PageParams):Observable<Quote[]> => {
    return pageSize === 0 ?
      this.backend.getAllQuotes().pipe(
        map((q:QuotesResponse) => q.quotes),
        map((quotes:Quote[]) => 
          quotes.filter((q:Quote) =>
              q.author.trim() === this.chosenAuthor.trim()))
      )
      :
      this.backend.getQuoteByPage(pageSize, skip).pipe(
        tap( (q:QuotesResponse) => this.allQuotesCount.next(q.total) ),
        tap(console.log),
        map( (q:QuotesResponse) => q.quotes )
      )
  }

  get pageParams$():Observable<PageParams>{//hot obs
    return this.pageParams.asObservable();
  }
  
  get allQuotesCount$(): Observable<number>{
      return this.allQuotesCount.asObservable();
  }

  
  getQuotesFromAuthor(author: string) {
    this.chosenAuthor = author;
    this.updatePageParams({pageSize: 0, skip:0});
  }

  updatePageParams(newParams:PageParams):void{
    this.pageParams.next(newParams);      
  }
  getDefaultQuotes(){      
    this.updatePageParams(DEFAULT_PAGE_PARAMS);
  } 

  pageChanged(paginatorParams: PageEvent) {
    const newValues:PageParams = {
      pageSize: paginatorParams.pageSize,
      skip: paginatorParams.pageIndex * paginatorParams.pageSize,
      previousPageIndex: paginatorParams.previousPageIndex
    }
    this.updatePageParams(newValues);
  }
}
