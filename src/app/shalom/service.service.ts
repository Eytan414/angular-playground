import { inject,Injectable, signal } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { filter, switchMap, takeUntil } from 'rxjs/operators';

@Injectable()
export class ShalomService {
  private http:HttpClient = inject(HttpClient);


  baseUrl = 'https://jsonplaceholder.typicode.com';

  getUserPosts(userId:number):Observable<Post[]> {
    return this.http.get<Post[]>(`${this.baseUrl}/posts`);
  }
  
  getUsers():Observable<User[]>{
    return this.http.get<User[]>(this.baseUrl + '/users');
  }


  // TODO:
  /* getUsers(): Observable<User[]> {
    return this.getCurrentUser().pipe(
      switchMap((user: User) => {
        return this.getUserItems(user.uid);
      })
    );
  } */


}

export interface User {
  id: number,
  name: string,
  email: string,
  address: {},
  phone: string,
  website: string,
  company: {
    name: string,
    catchPhrase: string,
    bs: string
  }
}

export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}
