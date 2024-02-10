import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { routes } from './app/core/routes/routes';
import { tokenInterceptor } from './app/core/interceptors/token-interceptor';
import { refreshInterceptor } from './app/core/interceptors/refresh-interceptor';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptors([tokenInterceptor, refreshInterceptor])),
    provideAnimations(),
  ],
}).catch(err => console.error(err));
