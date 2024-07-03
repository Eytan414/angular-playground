import { Routes } from '@angular/router';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { RxjsPlaygroundComponent } from '././rxjs-playground/rxjs-playground.component';


export const routes: Routes = [
    
  { path: '', component: ContactUsComponent },
  { path: 'rxjs', component: RxjsPlaygroundComponent },

];
