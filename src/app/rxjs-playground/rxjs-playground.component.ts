import { Component, OnInit, ViewEncapsulation, WritableSignal, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDividerModule } from '@angular/material/divider';
import { CdkAccordionModule } from '@angular/cdk/accordion';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';

import {Observable, tap, EMPTY } from 'rxjs';
import { ControllerService } from '../services/controller.service';
import { Quote} from '../shared/models/quotes';
import { ClickData } from '../shared/models/clickData';
import { Todo } from '../shared/models/todo';
import { authors } from '../shared/models/data';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSliderModule } from '@angular/material/slider';
import { MatInputModule } from '@angular/material/input';
import { PageParams } from '../shared/models/pageParams';
import { State } from '../shared/models/state';

@Component({
  selector: 'app-rxjs-playground',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatDividerModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatInputModule,
    MatSliderModule,
    MatRadioModule,
    MatPaginatorModule,
    MatIconModule,
    CdkAccordionModule,
    MatExpansionModule,
    MatFormFieldModule,
    CommonModule,
  ],
  templateUrl: './rxjs-playground.component.html',
  styleUrl: './rxjs-playground.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class RxjsPlaygroundComponent implements OnInit{
  private controller: ControllerService = inject(ControllerService);
  private fb: FormBuilder = inject(FormBuilder);
  
  randomNumbers$:Observable<number[]> = this.controller.getRandomNumbers();
  clicks$:Observable<ClickData[]> = this.controller.getClicks();
  radio$: Observable<string> = this.controller.radio$;
  pageParams$:Observable<PageParams> = this.controller.pageParams$;

  
  intervalForm:FormGroup = this.fb.group(
    {count: [undefined, Validators.required]}
  );

  timerForm:FormGroup = this.fb.group(
    {count: [undefined, Validators.required]}
  );
  
  allQuotesCount: Observable<number> = this.controller.allQuotesCount$;
  showBack:boolean = false;
  authors:string[] = authors;
  selectedAuthor!:string;
  authorSelectControl = new FormControl();
  
  arrayColumnsCount: number = 10;
  arrayColorInput = new FormControl('#000');
  arrayColor$:Observable<string> = this.controller.getColors(this.arrayColorInput);
  
  todos$:Observable<Todo[]> = this.controller.todos$;
  quotes$:Observable<Quote[]> = this.controller.quotes$;
  intervalCounter$!:Observable<number[]>;
  timerCounter$!:Observable<number[]>;

  // mySweetSignal:WritableSignal<any> = signal(0);


  columnSliderChange(newColumnCount:number){
    document.getElementsByTagName('body')[0].style.setProperty('--columnCount', newColumnCount+"");
  }

  ngOnInit():void{
    this.arrayColorInput.setValue('#000');
  }
  timerSubmit():void{
    const inputValue = this.timerForm.value.count.valueChanges;
    this.timerCounter$ = this.controller.newTimer(inputValue);
  }

  intervalSubmit():void{
    const inputValue = this.intervalForm.value.count;
    this.intervalCounter$ = this.controller.newInterval(inputValue);
  }
  recordClicks(){
    this.controller.setClickEventActive();
  }

  showPopover(show:boolean = false, index: number): void{
    const trigger:HTMLElement = document.querySelector(`[popover="popover-${index}"]`) as HTMLElement;
    if (trigger) 
      show ?
      trigger.showPopover() :
      trigger.hidePopover();
  }
  
  radioChanged(newValue:string):void{
    this.controller.radioChanged(newValue);
  }
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