import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TitleService {
  private title: string = '';

  constructor() {
    this.updateTitle();
  }
  updateTitle() {
    const titleElement = document.getElementsByTagName('title')[0];
    titleElement.innerText = this.title;
  }

  setTitle(newTitle: string): void {
    this.title = newTitle;
    this.updateTitle();
  }
}
