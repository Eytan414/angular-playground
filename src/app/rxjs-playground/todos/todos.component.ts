import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';

import { Observable } from 'rxjs/internal/Observable';
import { Todo } from '../../shared/models/todo';
import { TodosService } from './todos.service';
import { TodoItemComponent } from './todo-item/todo-item.component';

@Component({
  selector: 'todos',
  standalone: true,
  imports: [
    AsyncPipe,
    TodoItemComponent
  ],
  templateUrl: './todos.component.html',
  styleUrl: './todos.component.scss'
})
export class TodosComponent {
  private controller = inject(TodosService);

  todos$:Observable<Todo[]> = this.controller.getTodos();
}
