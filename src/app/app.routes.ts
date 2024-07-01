import { Routes } from '@angular/router';
import { ShalomComponent } from './shalom/shalom.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { RxjsPlaygroundComponent } from '././rxjs-playground/rxjs-playground.component';


export const routes: Routes = [
    
  { path: '', component: ContactUsComponent },
  { path: 'rxjs', component: RxjsPlaygroundComponent },
  { path: 'shalom', component: ShalomComponent },

];
