import { enableProdMode } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { environment } from './environments/environment';
import { appRoutes } from './app/app.routes';
import 'zone.js';

import { MdsConfig } from '@maersk-global/mds-config';
MdsConfig.iconsDynamicImportPath = '/public/assets/';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(appRoutes),
    // Add any other global providers here (e.g., HttpClientModule, provideAnimations() if needed)
  ],
}).catch((err) => console.error(err));
