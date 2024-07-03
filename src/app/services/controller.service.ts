import { Injectable, inject } from '@angular/core';
import {Observable } from 'rxjs/internal/Observable';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

import { BackendService } from './backend.service';
import { baseUrl } from '../shared/constants/constants';

@Injectable({ providedIn: 'root' })
export class ControllerService {
  private backendService = inject(BackendService);
  private radio = new BehaviorSubject<string>('quotes');
  readonly radio$:Observable<string> = this.radio.asObservable();

  radioChanged(newValue:string){
    this.radio.next(newValue);
  } 

  getProducts(): Observable<unknown[]>{
    const url = `${baseUrl}getProducts`;
    return this.backendService.get<unknown[]>(url);
  }
  
  sendDataArr(arr:number[]) {
    const url = baseUrl + 'data';
    return this.backendService
    .post<number[]>(
        url,
        JSON.stringify(arr),
        'application/json'
      );
  }
  submit(formData: any) {
    const url = baseUrl + 'contactus'; 

    return this.backendService.post(
        url,
        JSON.stringify(formData),
        'application/json'
      );
  }
}
