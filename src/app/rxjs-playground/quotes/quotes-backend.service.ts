import { Injectable, inject } from '@angular/core';
import { BackendService } from '../../services/backend.service';
import { Observable } from 'rxjs/internal/Observable';
import { QuotesResponse } from '../../shared/models/quotes';
@Injectable({
  providedIn: 'root'
})
export class QuotesBackendService {
  private backend = inject(BackendService);
  readonly baseUrl = 'https://dummyjson.com/quotes';
  
  getAllQuotes():Observable<QuotesResponse>{
    const url = `${this.baseUrl}?limit=0`;
    return this.backend.get<QuotesResponse>(url);
  }
  getQuoteByPage(pageSize:number = 20, skip:number = 0):Observable<QuotesResponse>{
    const url = `${this.baseUrl}?limit=${pageSize}&skip=${skip}`;
    return this.backend.get<QuotesResponse>(url);
  }

}
