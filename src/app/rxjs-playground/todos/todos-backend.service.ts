import { Observable } from 'rxjs/internal/Observable';
import { Injectable, inject } from '@angular/core';
import { Todo } from '../../shared/models/todo';
import { BackendService } from '../../services/backend.service';

@Injectable({
  providedIn: 'root'
})
export class TodosBackendService {
  private backend = inject(BackendService);

  getAllTodos():Observable<Todo[]>{
    const url = 'https://jsonplaceholder.typicode.com/todos';
    return this.backend.get<Todo[]>(url);

  }
}
