import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, inject } from '@angular/core';
import { AsyncPipe, CommonModule } from '@angular/common';
import { Observable } from 'rxjs/internal/Observable';
import { ClickData } from '../../shared/models/clickData';
import { ClicksService } from './clicks.service';

@Component({
  selector: 'clicks',
  standalone: true,
  imports: [CommonModule, AsyncPipe],
  templateUrl: './clicks.component.html',
  styleUrl: './clicks.component.scss'
})
export class ClicksComponent implements AfterViewInit{
  private controller = inject(ClicksService);
  
  @ViewChild('clickSurface') clickSurface!: ElementRef;
  clicks$:Observable<ClickData[]> = this.controller.getClicks();

  ngAfterViewInit(){
    this.controller.registerClickSurfaceElement(this.clickSurface.nativeElement);
  }
}
