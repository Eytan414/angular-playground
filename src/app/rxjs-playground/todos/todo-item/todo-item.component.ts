import { Component, input } from '@angular/core';
import { MatDivider } from '@angular/material/divider';
import { MatIcon } from '@angular/material/icon';
import { Todo } from '../../../shared/models/todo';

@Component({
  selector: 'todo-item',
  standalone: true,
  imports: [
    MatDivider,
    MatIcon,
  ],
  templateUrl: './todo-item.component.html',
  styleUrl: './todo-item.component.scss'
})
export class TodoItemComponent {
  readonly todo = input.required<Todo>();
}
