import { Observable } from "rxjs/internal/Observable"
import { Quote } from "./quotes"
import { Todo } from "./todo"

export type State = {
    todos$:Observable<Todo[]>,
    quotes$:Observable<Quote[]>,
}