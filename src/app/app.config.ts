import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { HttpClientModule } from "@angular/common/http";
import { routes } from './app.routes';
import { ControllerService } from './services/controller.service';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

export const appConfig: ApplicationConfig = {
  providers: [
      provideRouter(routes),
      ControllerService,
      importProvidersFrom(HttpClientModule), provideAnimationsAsync('noop'), provideAnimationsAsync()  
    ]
};
