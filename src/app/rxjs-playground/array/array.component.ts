import { AsyncPipe } from '@angular/common';
import { Component, WritableSignal, inject, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatSliderModule } from '@angular/material/slider';
import { Observable } from 'rxjs/internal/Observable';
import { ArrayService } from './array.service';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'array',
  standalone: true,
  imports: [
    MatSliderModule, 
    MatFormFieldModule,
    ReactiveFormsModule, 
    MatInputModule,
    AsyncPipe,
    MatLabel,
   ],
  templateUrl: './array.component.html',
  styleUrl: './array.component.scss'
})
export class ArrayComponent{
  private controller = inject(ArrayService);

  colorInput = new FormControl('#000000');
  randomNumbers$:Observable<number[]> = this.controller.getRandomNumbers();
  columnCount:WritableSignal<number> = signal<number>(10);  
}
