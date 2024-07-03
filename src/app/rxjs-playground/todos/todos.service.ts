import { Injectable, inject } from '@angular/core';
import { TodosBackendService } from './todos-backend.service';
import { Observable } from 'rxjs/internal/Observable';
import { Todo } from '../../shared/models/todo';

@Injectable({
  providedIn: 'root'
})
export class TodosService {
 private backend = inject(TodosBackendService);
 
  get todos$(): Observable<Todo[]>{
    return this.backend.getAllTodos();
  }
  

  
}
