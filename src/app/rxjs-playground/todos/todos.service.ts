import { Injectable, inject } from '@angular/core';
import { TodosBackendService } from './todos-backend.service';
import { Observable } from 'rxjs/internal/Observable';
import { Todo } from '../../shared/models/todo';
import { map } from 'rxjs';
import { todoSort } from '../../shared/utils/utils';

@Injectable({
  providedIn: 'root'
})
export class TodosService {
 private backend = inject(TodosBackendService);
 
  getTodos(): Observable<Todo[]>{
    return this.backend.getAllTodos().pipe(
      map(todos => todos.sort(todoSort))
    );
  }
  

  
}
