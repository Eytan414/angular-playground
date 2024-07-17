import { Component, inject, input } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Observable } from 'rxjs/internal/Observable';
import { AsyncPipe } from '@angular/common';
import { CounterService } from './counter.service';

@Component({
  selector: 'interval-timer',
  standalone: true,
  imports: [AsyncPipe,
    ReactiveFormsModule,

  ],
  templateUrl: './interval-timer.component.html',
  styleUrl: './interval-timer.component.scss'
})
export class IntervalTimerComponent {
  private fb = inject(FormBuilder);
  private controller = inject(CounterService);
  
  readonly type = input.required<string>();
  counter$!:Observable<number[]>;
  form:FormGroup = this.fb.group({
    count: [
      undefined,
      [
        Validators.required,
        Validators.min(1),
        Validators.max(250)
      ]
    ]
  });

  submit():void{
    const inputValue = this.form.value.count;
    this.counter$ = this.controller.newCounter(inputValue, this.type());
  }

  
}