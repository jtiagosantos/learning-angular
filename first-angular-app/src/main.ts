import { bootstrapApplication,provideProtractorTestingSupport } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { AppComponent } from './app/app.component';
import { routes } from './app/app-routing';

bootstrapApplication(AppComponent,
    {
      providers: [
        provideProtractorTestingSupport(),
        provideRouter(routes),
        provideHttpClient()
      ]
    },
  ).catch(err => console.error(err));
