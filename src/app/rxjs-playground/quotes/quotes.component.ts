import { Component, ViewEncapsulation, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatOption, MatSelect } from '@angular/material/select';
import { PageParams } from '../../shared/models/pageParams';
import { Observable } from 'rxjs/internal/Observable';
import { QuotesService } from './quotes.service';
import { authors } from '../../shared/models/data';
import { Quote } from '../../shared/models/quotes';
import { QuotesCardComponent } from './quotes-card/quotes-card.component';

@Component({
  selector: 'quotes',
  standalone: true,
  imports: [
    MatFormFieldModule,
    ReactiveFormsModule,
    MatIcon,
    MatSelect,
    MatOption,
    MatPaginatorModule,
    QuotesCardComponent,
    AsyncPipe,

  ],
  templateUrl: './quotes.component.html',
  styleUrl: './quotes.component.scss',
  encapsulation: ViewEncapsulation.None,

})
export class QuotesComponent {
  controller = inject(QuotesService);

  authors:string[] = authors;
  showBack:boolean = false;
  arrayColumnsCount: number = 10;
  authorSelectControl = new FormControl();

  pageParams$:Observable<PageParams> = this.controller.pageParams$;
  allQuotesCount: Observable<number> = this.controller.allQuotesCount$;
  quotes$:Observable<Quote[]> = this.controller.quotes$;
  

  

  paginatorChange(paginatorParams:PageEvent){
    this.controller.pageChanged(paginatorParams);
  }
  getAllFromAuthor(author:string):void {
    this.showBack = true;
    this.authorSelectControl.setValue(author);
    this.controller.getQuotesFromAuthor(author);
  }
  backToAllAuthors():void {
    this.showBack = false;
    this.authorSelectControl.setValue('');
    this.controller.getDefaultQuotes();
  }

  
}
