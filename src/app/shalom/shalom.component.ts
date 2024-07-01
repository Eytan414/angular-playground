import { AfterViewInit, Component,inject,signal,VERSION } from '@angular/core';
import { CommonModule  } from '@angular/common';
import { ShalomService} from './service.service';
import {User, Post} from './service.service';
import {Observable, map, tap, from, concatMap, of, delay, interval} from 'rxjs';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-shalom',
  standalone: true,
  imports: [CommonModule,MatToolbarModule,MatIconModule],
  templateUrl: './shalom.component.html',
  styleUrl: './shalom.component.scss'
})

export class ShalomComponent implements AfterViewInit{
  private service: ShalomService = inject(ShalomService);
  
  name = 'Angular ' + VERSION.major;
  users$!: Observable<User[]>;
  user!: User;
  currentUserPosts$!: Observable<Post[]>;
  currentUserId:number = -1;
  curUserId = signal(-1);
  
  ngAfterViewInit(){
    this.users$ = this.service.getUsers();
    
    const source = of(1, 2, 3);
    source.pipe(
      concatMap(val => of(`Processed: ${val}`).pipe(delay(1000)))
    ).subscribe(result => console.log(result));
    
    interval
    const fruits:Observable<string> = from<string[]>([
      "dirty-apple",
      "apple",
      "dirty-banana",
      "banana"]);

    fruits.pipe(map((f:string) =>{
      if(!f.startsWith('dirty') )
         return f;
      return f.substring(6)
    })).subscribe((fruit:string) => console.log(fruit));
   

    /* 
    const array1 = ['1', '2', '3'];
    const array2 = ['4', '5', '6', '7'];
    const array3 = ['7', '8', '9'];
    let magic:string[][] = [];
    const observable:Observable<string[]> = from([array1, array2, array3]);
    observable.pipe(
      map((numbers:string[]) => numbers.map(n => n+='5'))
    ).subscribe( (numbers:string[]) => {console.log(numbers);
      return magic.push(numbers)});


console.log(magic);
 */


    } 

  userChanged(userId:number):void{
    this.curUserId.set(userId);

    this.users$.pipe(
      tap(users => {
        console.log(users.filter(u => u.id === userId));
        this.user = users.filter(u => u.id === userId)[0];
    })).subscribe();
 
    this.currentUserPosts$ = this.service.getUserPosts(userId)
      .pipe(map((
        (posts:Post[]) => 
          posts.filter(p => p.userId === this.curUserId())
    )));


    }
  
  
}


