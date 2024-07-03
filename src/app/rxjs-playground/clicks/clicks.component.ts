import { Component, inject } from '@angular/core';
import { AsyncPipe, CommonModule } from '@angular/common';
import { Observable } from 'rxjs/internal/Observable';
import { ClickData } from '../../shared/models/clickData';
import { PlaygroundService } from '../playground.service';

@Component({
  selector: 'clicks',
  standalone: true,
  imports: [CommonModule,
    AsyncPipe
  ],
  templateUrl: './clicks.component.html',
  styleUrl: './clicks.component.scss'
})
export class ClicksComponent {
  private controller = inject(PlaygroundService);

  clicks$:Observable<ClickData[]> = this.controller.getClicks();
  
  recordClicks(){
    this.controller.setClickEventActive();
  }
  
}
