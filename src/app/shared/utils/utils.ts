import { Todo } from '../models/todo';

export function createArray(index:number):number[][]{
    const numbers = Array.from({ length: index + 1 }, (_, i) => i + 1);
    return [numbers];
}
export function todoSort(t1:Todo, t2:Todo):number{
    if(t1.completed) return -1;
    if(t2.completed) return 1;
    return 0;
  }
