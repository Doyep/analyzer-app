import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, withHashLocation } from '@angular/router';
import { AppComponent } from './app/app.component';
import { routes } from './app/core/routes/routes';
import { refreshTokenInterceptor } from './app/services/refresh-interceptor';
import { tokenInterceptor } from './app/services/token-interceptor';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes, withHashLocation()),
    provideHttpClient(withInterceptors([tokenInterceptor, refreshTokenInterceptor])),
  ],
}).catch(err => console.error(err));
