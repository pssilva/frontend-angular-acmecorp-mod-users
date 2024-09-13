import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { appRoutes } from './app.routes';
import { USERS_ROUTES } from './users/users.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations'
import { provideToastr } from 'ngx-toastr';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(appRoutes),
    provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(USERS_ROUTES),
    provideAnimations(),
    provideToastr(),
    provideHttpClient(),
  ]
};
