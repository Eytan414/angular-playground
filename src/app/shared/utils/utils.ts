import { Todo } from '../models/todo';

export function todoSort(t1:Todo, t2:Todo):number{
    if(t1.completed) return -1;
    if(t2.completed) return 1;
    return 0;
  }
