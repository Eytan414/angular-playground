import { Component, OnInit, ViewEncapsulation, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDividerModule } from '@angular/material/divider';
import { CdkAccordionModule } from '@angular/cdk/accordion';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';

import {Observable } from 'rxjs/internal/Observable';
import { ControllerService } from '../services/controller.service';
import { MatInputModule } from '@angular/material/input';
import { ClicksComponent } from './clicks/clicks.component';
import { IntervalTimerComponent } from './interval-timer/interval-timer.component';
import { ArrayComponent } from './array/array.component';
import { QuotesComponent } from './quotes/quotes.component';
import { TodosComponent } from './todos/todos.component';

@Component({
  selector: 'rxjs-playground',
  standalone: true,
  imports: [
    MatToolbarModule,
    ClicksComponent,
    MatDividerModule,
    IntervalTimerComponent,
    ArrayComponent,
    ReactiveFormsModule,
    MatSelectModule,
    MatInputModule,
    MatRadioModule,
    MatIconModule,
    CdkAccordionModule,
    MatExpansionModule,
    MatFormFieldModule,
    QuotesComponent,
    TodosComponent,
    CommonModule,
  ],
  templateUrl: './rxjs-playground.component.html',
  styleUrl: './rxjs-playground.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class RxjsPlaygroundComponent {
  private controller: ControllerService = inject(ControllerService);
  
  radio$: Observable<string> = this.controller.radio$;

  //TODO: decide if reimplement functionality or remove 
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
}