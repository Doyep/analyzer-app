import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, withHashLocation } from '@angular/router';
import { AppComponent } from './app/app.component';
import { refreshInterceptor } from './app/core/interceptors/refresh-interceptor';
import { tokenInterceptor } from './app/core/interceptors/token-interceptor';
import { routes } from './app/core/routes/routes';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes, withHashLocation()),
    provideHttpClient(withInterceptors([tokenInterceptor, refreshInterceptor])),
  ],
}).catch(err => console.error(err));
