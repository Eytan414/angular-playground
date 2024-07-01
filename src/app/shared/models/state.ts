import { Observable } from "rxjs"
import { Quote } from "./quotes"
import { Todo } from "./todo"

export type State = {
    todos$:Observable<Todo[]>,
    quotes$:Observable<Quote[]>,
    intervalCounter$:Observable<number[]>,
    timerCounter$:Observable<number[]>
}