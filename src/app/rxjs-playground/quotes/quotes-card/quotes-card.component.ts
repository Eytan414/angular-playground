import { Component, EventEmitter, Output, input } from '@angular/core';
import { Quote } from '../../../shared/models/quotes';

@Component({
  selector: 'quote-card',
  standalone: true,
  imports: [],
  templateUrl: './quotes-card.component.html',
  styleUrl: './quotes-card.component.scss'
})
export class QuotesCardComponent {
  readonly quote = input.required<Quote>();
  @Output() authorChanged: EventEmitter<string> = new EventEmitter();

  getAllFromAuthor(author:string){
    this.authorChanged.emit(author);
  }
}
