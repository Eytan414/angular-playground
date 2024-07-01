import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  private http = inject(HttpClient);  

  get<T>(url:string):Observable<T>{
    return this.http.get<T>(url);
  }

  post<T>(url:string, payload:unknown, contentType?:string ):Observable<T>{

    return contentType ? 
      this.http.post<T>(url,payload, {headers: {'Content-Type':contentType}}) :
      this.http.post<T>(url,payload)
  }

}
