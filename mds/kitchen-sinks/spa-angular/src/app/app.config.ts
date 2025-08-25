import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { AppRoutingModule } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(AppRoutingModule)],
};
